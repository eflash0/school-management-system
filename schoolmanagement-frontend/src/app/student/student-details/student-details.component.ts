import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { StudentService } from '../../services/student.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-details',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css'
})
export class StudentDetailsComponent implements OnInit {
  student : any;
  coursesList : any;
  selectedCourseId : String = '';
  constructor (private courseService : CourseService,private studentService:StudentService) {}
  ngOnInit(): void {
      this.student = history.state.student; // here i should pass the id from get-students and use 
      //studentService to get the student to have a the student updated when registered in a course
      console.log(this.student.courses.length);
      this.courseService.getCourses().subscribe(
        response => {console.log('courses are fetched',response)
          this.coursesList = response;
        },
        error => {console.error('error fetching for courses',error);
        }
      );
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
}
