import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCourseComponent } from '../add-course/add-course.component';
import { UpdateCourseComponent } from '../update-course/update-course.component';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-get-courses',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './get-courses.component.html',
  styleUrl: './get-courses.component.css'
})
export class GetCoursesComponent implements OnInit {
  courseList : any;
  filteredCourseList : any;
  constructor(private courseService : CourseService,public dialog : MatDialog) {}

  ngOnInit(): void {
      this.courseService.getCourses().subscribe(
        response => {
          this.courseList = response;
          this.filteredCourseList = this.courseList;
        },
        error => {console.error('error fetching for courses',error);
        }
      );
  }

  addCourse() : void{
    const dialogRef = this.dialog.open(AddCourseComponent,{width:'400px',height:'230px',});
    dialogRef.afterClosed().subscribe(
      response => {
        console.log('dialog closes successfully',response);
        this.ngOnInit();
      },
      error => {console.error('an error occurs',error);}
    );
  }

  updateCourse(course : any) : void{
    const dialogRef = this.dialog.open(UpdateCourseComponent,{width:'400',height:'230px',data:course});
    dialogRef.afterClosed().subscribe(
      response => {
        console.log('dialog closes successfully',response);
        this.ngOnInit();
      },
      error => {console.error('an error occurs',error);}
    )
  }

  deleteCourse(idCourse : number) : void{
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      data : {title : 'Course Deletion',content : 'Are you sure you wanna delete this course?'}
    });
    dialogRef.afterClosed().subscribe(
      response => {
        if(response){
          this.courseService.deleteCourse(idCourse).subscribe(
            response => {
              console.log('course deleted with sucess',response);
              this.ngOnInit();
            },
            error => {console.error('error deleting course',error);
            }
          );
        }
      }
    );
  }
  searchCourses(event : Event) : void{
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredCourseList = this.courseList.filter((course : any) => {
      return (course.name.toLowerCase().includes(searchTerm));
    });
  }
}
