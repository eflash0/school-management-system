import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherService } from '../../services/teacher.service';
import { MatDialog } from '@angular/material/dialog';
import { AddTeacherComponent } from '../add-teacher/add-teacher.component';
import { UpdateTeacherComponent } from '../update-teacher/update-teacher.component';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-get-teachers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './get-teachers.component.html',
  styleUrl: './get-teachers.component.css'
})
export class GetTeachersComponent implements OnInit {
  teacherList : any;
  constructor (private teacherService : TeacherService,public dialog : MatDialog,
  private router:Router) {}
  ngOnInit(): void {
      this.teacherService.getAllTeachers().subscribe(
        response => {
          this.teacherList = response;
        },
        error => {
          console.error('error fetching teachers',error);
          
        }
      )
  }

  addTeacher() : void{
    const dialogRef = this.dialog.open(AddTeacherComponent,{width : '400px',height : '400px'});
    dialogRef.afterClosed().subscribe(
      response => {
        console.log('dialog closed successfully');
        this.ngOnInit();
      }
    );
  }

  updateTeacher(teacher:any) : void{
    const dialogRef = this.dialog.open(UpdateTeacherComponent,{width : '400px',height : '400px',data:teacher});
    dialogRef.afterClosed().subscribe(
      response => {
        console.log('dialog close successfully');
        this.ngOnInit();
      }
    );
  }

  deleteTeacher(teacherId : number) : void{
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      data : {title : 'Teacher Deletion',content : 'Are you sure you want to delete this teacher?'}
    });
    dialogRef.afterClosed().subscribe(
      response => {
        if(response){
          this.teacherService.deleteTeacher(teacherId).subscribe(
            response => {
              console.log('Teacher deleted successfully',response);
              this.ngOnInit();
            },
            error => {console.error('an errorr occurs deleting the teacher');
            }
          );
        }
      }
    );
  }

  viewDetails(teacherId : number):void{
    //this.router.navigate(['teacher-details'],{state:{teacherId}});
    this.router.navigate(['/teachers', teacherId, 'classrooms']);

  }
}
