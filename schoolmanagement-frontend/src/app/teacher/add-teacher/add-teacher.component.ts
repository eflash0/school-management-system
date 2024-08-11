import { Component, OnInit } from '@angular/core';
import { Teacher } from '../../teacher';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TeacherService } from '../../services/teacher.service';
import { CourseService } from '../../services/course.service';

import { CommonModule } from '@angular/common';
import { Course } from '../../course';
@Component({
  selector: 'app-add-teacher',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-teacher.component.html',
  styleUrl: './add-teacher.component.css'
})
export class AddTeacherComponent implements OnInit {
  teacher : Teacher = new Teacher('','','','',[]);
  courses : any;
  courseId : String = '';
  constructor (public dialogRef : MatDialogRef<AddTeacherComponent>,private teacherService : TeacherService,
  private courseService : CourseService) { }

  ngOnInit(): void {
      this.courseService.getCourses().subscribe(
        response => {this.courses=response},
        error => {console.error('error fetching courses',error);
        }
      );
  }
  
  addTeacher() : void{
    if(this.courseId){
      this.courseService.getCourseById(Number(this.courseId)).subscribe(
        response => {
          this.teacher.course = response;
          this.teacherService.addTeacher(this.teacher).subscribe(
            response => {
              console.log('teacher added successfuly',response);
              this.dialogRef.close();
            },
            error => {console.error('error adding teacher',error);
            }
          );
        }
      );
    }
    
  }

  onCancel() : void{
    this.dialogRef.close();
  }
}
