import { Component, OnInit } from '@angular/core';
import { ClassroomService } from '../../services/classroom.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-get-classrooms',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './get-classrooms.component.html',
  styleUrl: './get-classrooms.component.css'
})
export class GetClassroomsComponent implements OnInit {
  constructor(private classroomService : ClassroomService,public dialogRef : MatDialog,
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
    
  }

  updateClassroom(classroom : any) : void{

  }

  deleteClassroom(classroomId : number) : void{

  }

  viewStudents(classroomId : number) : void{

  }
}
