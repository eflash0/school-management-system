import { Component, Inject, OnInit } from '@angular/core';
import { TeacherService } from '../../services/teacher.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../services/course.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-teacher',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './update-teacher.component.html',
  styleUrl: './update-teacher.component.css'
})
export class UpdateTeacherComponent implements OnInit{
  teacher : any;
  courses : any;
  courseId : String = '';
  constructor(private teacherService : TeacherService,public dialogRef : MatDialogRef<UpdateTeacherComponent>,
  @Inject(MAT_DIALOG_DATA) public data : any,private courseService : CourseService) {
    this.teacher = {...data};
  }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(
      response => {this.courses=response},
      error => {console.error('error fetching courses',error);
      }
    );
  }
  updateTeacher() : void{
    if(this.courseId){
      this.courseService.getCourseById(Number(this.courseId)).subscribe(
        response => {
          this.teacher.course = response;
          console.log(this.teacher.course);
          this.teacherService.updateTeacher(this.teacher.teacherId,this.teacher).subscribe(
            response => {
              console.log('teacher updated successfully',response);
              console.log(this.teacher.course);
              this.dialogRef.close();
            },
            error => {console.error('error updating teacher',error);
            }
          );
        }
      );
    }
    else{
      this.teacherService.updateTeacher(this.teacher.teacherId,this.teacher).subscribe(
        response => {
          console.log('teacher updated successfully',response);
          console.log(this.teacher.course);
          this.dialogRef.close();
        },
        error => {console.error('error updating teacher',error);
        }
      );
    }
    
  }

  onCancel() : void{
    this.dialogRef.close();
  }
}
