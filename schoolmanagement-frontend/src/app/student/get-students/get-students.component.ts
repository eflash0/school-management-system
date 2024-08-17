import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student.service';
import { MatDialog } from '@angular/material/dialog';
import { AddStudentComponent } from '../add-student/add-student.component';
import { UpdateStudentComponent } from '../update-student/update-student.component';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-get-students',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './get-students.component.html',
  styleUrl: './get-students.component.css'
})
export class GetStudentsComponent implements OnInit {
  studentList : any;
  filteredStudentList : any;
  constructor (private studentService : StudentService,public dialog : MatDialog,
  private router:Router) {}
  ngOnInit(): void {
      this.studentService.getAllStudents().subscribe(
        response => {
          this.studentList = response;
          this.filteredStudentList = [...this.studentList];
        },
        error => {
          console.error('error fetching students',error);
          
        }
      );
  }

  addStudent() : void{
    const dialogRef = this.dialog.open(AddStudentComponent,{width : '400px',height : '400px'});
    dialogRef.afterClosed().subscribe(
      response => {
        console.log('dialog closed successfully');
        this.ngOnInit();
      }
    );
  }

  updateStudent(student:any) : void{
    const dialogRef = this.dialog.open(UpdateStudentComponent,{width : '400px',height : '400px',data:student});
    dialogRef.afterClosed().subscribe(
      response => {
        console.log('dialog close successfully');
        this.ngOnInit();
      }
    );
  }

  deleteStudent(studentId : number) : void{
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      data : {title : 'Student Deletion',content : 'Are you sure you want to delete this student?'}
    });
    dialogRef.afterClosed().subscribe(
      response => {
        if(response){
          this.studentService.deleteStudent(studentId).subscribe(
            response => {
              console.log('student deleted successfully',response);
              this.ngOnInit();
            },
            error => {console.error('an errorr occurs deleting the student');
            }
          );
        }
      }
    );
  }

  viewDetails(studentId : number):void{
    this.router.navigate(['student-details'],{state:{studentId}})
  }

  searchStudents(event : Event) : void{
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredStudentList = this.studentList.filter((student : any) => {
      return (
        student.firstName.toLowerCase().includes(searchTerm) ||
        student.lastName.toLowerCase().includes(searchTerm) ||
        student.code.toLowerCase().includes(searchTerm) ||
        student.nationalCode.toLowerCase().includes(searchTerm) 
      );
    });
  }
}
