import { Component, Inject } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-course',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-course.component.html',
  styleUrl: './update-course.component.css'
})
export class UpdateCourseComponent {
  course : any;
  constructor(private courseService:CourseService,public dialogRef:MatDialogRef<UpdateCourseComponent>,
    @Inject(MAT_DIALOG_DATA) data : any) {
      this.course = {...data};
  }

  updateCourse() : void{
    this.courseService.updateCourse(this.course.courseId,this.course).subscribe(
      response => {
        console.log('course updated successfully',response);
        this.dialogRef.close();
      },
      error => {console.error('error updating course',error);
      }
    )
  }

  onCancel() : void{
    this.dialogRef.close();
  }
}
