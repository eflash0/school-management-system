import { Component } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Course } from '../../course';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent {
  course : Course = new Course('');
  constructor(private courseService : CourseService,public dialogRef : MatDialogRef<AddCourseComponent>) {}
  addCourse() : void{
    this.courseService.addCourse(this.course).subscribe(
      response => {
        console.log('course added successfully',response);
        this.dialogRef.close();
      },
      error => {console.error('error adding course',error);}
    )
  }

  onCancel() : void{
    this.dialogRef.close();
  }
}
