import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { StudentService } from '../../services/student.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-details',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css'
})
export class StudentDetailsComponent implements OnInit {
  studentId : number = 0;
  coursesList : any;
  selectedCourseId : String = '';
  student : any = {};
  constructor (private courseService : CourseService,private studentService:StudentService,
  public dialog : MatDialog,private router : Router) {}
  ngOnInit(): void {
      this.studentId = history.state.studentId; // here i should pass the id from get-students and use 
      //studentService to get the student to have a the student updated when registered in a course
      // console.log(this.student.courses.length);
      if(this.studentId>0){
        this.studentService.getStudentById(this.studentId).subscribe(
          response => {console.log('student fetched correctly',response);
            this.student = response;
          },
          error => {console.error('error fetching student',error);}
        );
        this.courseService.getCourses().subscribe(
          response => {console.log('courses are fetched',response);
            this.coursesList = response;
          },
          error => {console.error('error fetching for courses',error);
          }
        );
      }
      else{
        this.router.navigate(['get.students']);
      }
  }

  registerStudentInCourse() : void{
    if(this.selectedCourseId){
      this.studentService.registerStudentInCourse(this.student.studentId,
        Number(this.selectedCourseId)).subscribe(
          response => {
            console.log('student is successfully registred in the course',response);
            this.ngOnInit();
          },
          error => {console.error('error registring student in the course',error);
          }
        );
    }
  }
  unregisterStudentFromCourse(courseId : number) : void{
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      data : {title : 'Unregistration Confirmation' , content : 'Are you sure you wanna unregister the student from the course?'}
    });
    dialogRef.afterClosed().subscribe(
      result => {
        if(result){
          this.studentService.unregisterStudentFromCourse(this.student.studentId,courseId).subscribe(
            response => {
              console.log('student unregistred from course',response);
              this.ngOnInit();
            },
            error => {console.error('error unregistring student from course',error);
            }
          );
        }
      }
    );
    
  }
}
