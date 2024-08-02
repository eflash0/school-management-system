import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student.service';
import { MatDialog } from '@angular/material/dialog';
import { AddStudentComponent } from '../add-student/add-student.component';
import { UpdateStudentComponent } from '../update-student/update-student.component';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
@Component({
  selector: 'app-get-students',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './get-students.component.html',
  styleUrl: './get-students.component.css'
})
export class GetStudentsComponent implements OnInit {
  studentList : any;
  constructor (private studentService : StudentService,public dialog : MatDialog) {}
  ngOnInit(): void {
      this.studentService.getAllStudents().subscribe(
        response => {
          this.studentList = response;
        },
        error => {
          console.error('error fetching students',error);
          
        }
      )
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
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{width : '400px',height : '400px'});
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
}
