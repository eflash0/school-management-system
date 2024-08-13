import { Component, Inject, OnInit } from '@angular/core';
import { ClassroomService } from '../../services/classroom.service';
import { TeacherService } from '../../services/teacher.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { Teacher } from '../../teacher';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-classroom',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './update-classroom.component.html',
  styleUrl: './update-classroom.component.css'
})
export class UpdateClassroomComponent implements OnInit {
  teachersList : any;
  classroom : any;
  teacherId : String = '';
  constructor(private classroomService : ClassroomService,private teacherService : TeacherService,
  public dialogRef : MatDialogRef<UpdateClassroomComponent>,
  @Inject(MAT_DIALOG_DATA) public data : any){
    this.classroom = {...data};
  }
  ngOnInit(): void {
    this.teacherService.getAllTeachers().subscribe(
      response => {this.teachersList = response;},
      error => {console.error('error fetching teachers',error);}
    );
  }

  updateClassroom() : void{
    const updateClassroomData = (teacher: Teacher | null) => {
      this.classroom.teacher = teacher;
      this.classroomService.updateClassroom(this.classroom.classroomId, this.classroom).subscribe(
        response => {
          console.log('Classroom updated successfully', response);
          console.log(this.classroom.course);
          this.dialogRef.close();
        },
        error => {
          console.error('Error updating teacher', error);
        }
      );
    };  
    if(this.teacherId){
      this.teacherService.getTeacherById(Number(this.teacherId)).subscribe(
        response => {updateClassroomData(response);},
        error => {console.error('error fetching teacher');}
      );
    }
    else{
      updateClassroomData(null);
    }
  }
  onCancel() : void{
    this.dialogRef.close();
  }
}
