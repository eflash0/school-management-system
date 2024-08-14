import { Component, OnInit } from '@angular/core';
import { ClassroomService } from '../../services/classroom.service';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Classroom } from '../../classroom';
import { TeacherService } from '../../services/teacher.service';
import { CourseService } from '../../services/course.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-classroom',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-classroom.component.html',
  styleUrl: './add-classroom.component.css'
})
export class AddClassroomComponent implements OnInit {
  classroom : Classroom = new Classroom();
  coursesList : any;
  teachersList : any;
  teacherId : number | null = null;
  constructor(private classroomService : ClassroomService,public dialogRef : MatDialogRef<AddClassroomComponent>,
    private teacherService : TeacherService,private courseService : CourseService) {}
  ngOnInit(): void {
    this.teacherService.getAllTeachers().subscribe(
      response => {this.teachersList = response;},
      error => {console.error('error fetching teachers',error);}
    );
  }

  addClassroom() : void{
    if(this.teacherId){
      this.teacherService.getTeacherById(Number(this.teacherId)).subscribe(
        response => {this.classroom.teacher = response;
          console.log('teacher found',response);
          console.log(this.teacherId);
          this.classroomService.addClassroom(this.classroom).subscribe(
            response => {
              console.log('classroom added successfully',response);
              this.dialogRef.close();
            },
            error => {console.error('error adding classroom',error);}
          );
        },
        error => {console.error('error finding teacher',error);
        }
      );
    }
    else {
      this.classroomService.addClassroom(this.classroom).subscribe(
        response => {
          console.log('classroom added successfully',response);
          this.dialogRef.close();
        },
        error => {console.error('error adding classroom',error);}
      );
    }
  }

  onCancel() : void{
    this.dialogRef.close();
  }
}
