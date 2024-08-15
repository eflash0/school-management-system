import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClassroomService } from '../../services/classroom.service';
import { StudentService } from '../../services/student.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-classroom-details',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './classroom-details.component.html',
  styleUrl: './classroom-details.component.css'
})
export class ClassroomDetailsComponent implements OnInit {
  classroomStudents : any;
  classroom : any;
  selectedStudentId : String = '';
  studentsList : any;
  studentsNumber : number = 0;
  classroomId : number;
  constructor(private classroomService : ClassroomService,private studentService : StudentService,
    private route : ActivatedRoute,public dialog : MatDialog) {
      this.classroomId = +this.route.snapshot.paramMap.get('classroomId')!;
      console.log(this.classroomId);
      
    }
  ngOnInit(): void {
    this.classroomService.getClassroomById(this.classroomId).subscribe(
      response => {this.classroom = response;},
      error => {console.error('error fetching classroom',error);
      }
    );
    this.studentService.getAllStudents().subscribe(
      response => {this.studentsList = response;},
      error => {console.error('error fetching students',error);
      }
    );
    this.classroomService.getClassroomStudents(this.classroomId).subscribe(
      response => {this.classroomStudents = response;},
      error => {console.error('error fetching students of this class',error);}
    );
    this.classroomService.countStudentsByClassroom(this.classroomId).subscribe(
      response => {this.studentsNumber=response;},
      error => {console.error('error fetching students count',error);}
    );
  }
  registerStudentInClassroom() : void{
    this.classroomService.registerStudentInClassroom(this.classroomId,Number(this.selectedStudentId))
    .subscribe(
      response => {this.ngOnInit();},
      error => {console.error('error registring student in classroom',error);}
    );
  }
  unregisterStudentFromClassroom(studentId : number) : void{
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      data : {title : 'Unregistration Confirmation',content : 'Are you sure you wanna unregister the student from the classroom?'}
    });
    dialogRef.afterClosed().subscribe(
      response => {
        if(response){
          this.classroomService.unregisterStudentFromClassroom(this.classroomId,studentId)
          .subscribe(
            response => {this.ngOnInit();},
            error => {console.error('error unregistring student from classroom',error);}
          );
        }
      }
    );
  }

}
