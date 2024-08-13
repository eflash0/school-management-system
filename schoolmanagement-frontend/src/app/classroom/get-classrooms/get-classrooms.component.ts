import { Component, OnInit } from '@angular/core';
import { ClassroomService } from '../../services/classroom.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AddClassroomComponent } from '../add-classroom/add-classroom.component';
import { UpdateClassroomComponent } from '../update-classroom/update-classroom.component';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-get-classrooms',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './get-classrooms.component.html',
  styleUrl: './get-classrooms.component.css'
})
export class GetClassroomsComponent implements OnInit {
  constructor(private classroomService : ClassroomService,public dialog : MatDialog,
    private router : Router) {}
  classroomList : any;  
  ngOnInit(): void {
    this.classroomService.getClassrooms().subscribe(
      response => {
        this.classroomList = response;
        console.log('classrooms fetched correctly',response);
      },
      error => {console.error('error fetching classrooms',error);
      }
    );
  }

  addClassroom() : void{
    const dialogRef = this.dialog.open(AddClassroomComponent,{width:'400px',height:'350px'});
    dialogRef.afterClosed().subscribe(
      response => {this.ngOnInit();}
    );
  }

  updateClassroom(classroom : any) : void{
    const dialogRef = this.dialog.open(UpdateClassroomComponent,{width:'400px',height:'350px',data:classroom});
    dialogRef.afterClosed().subscribe(
      response => {this.ngOnInit();}
    );
  }

  deleteClassroom(classroomId : number) : void{
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      data : {title:'Classroom Deletion',content:'Are you sure you wanna delete this classroom?'}});
    dialogRef.afterClosed().subscribe(
      response => {
        if(response){
          this.classroomService.deleteClassroom(classroomId).subscribe(
            response => { console.log('classroom is deleted with sucess');
              this.ngOnInit();},
            error => {console.error('error deleting classroom',error);
            }
          );
        }
      }
    );  
  }

  viewStudents(classroomId : number) : void{
    this.router.navigate(['/classrooms', classroomId, 'students']);
  }
}
