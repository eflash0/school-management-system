import { Component, Inject } from '@angular/core';
import { TeacherService } from '../../services/teacher.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-teacher',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-teacher.component.html',
  styleUrl: './update-teacher.component.css'
})
export class UpdateTeacherComponent {
  teacher : any;
  constructor(private teacherService : TeacherService,public dialogRef : MatDialogRef<UpdateTeacherComponent>,
  @Inject(MAT_DIALOG_DATA) public data : any) {
    this.teacher = {...data};
  }

  updateTeacher() : void{
    this.teacherService.updateTeacher(this.teacher.teacherId,this.teacher).subscribe(
      response => {
        console.log('teacher updated successfully',response);
        this.dialogRef.close();
      },
      error => {console.error('error updating teacher',error);
      }
    );
  }

  onCancel() : void{
    this.dialogRef.close();
  }
}
