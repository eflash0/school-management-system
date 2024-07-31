import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student.service';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-get-students',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './get-students.component.html',
  styleUrl: './get-students.component.css'
})
export class GetStudentsComponent implements OnInit {
  studentList : any;
  constructor (private studentService : StudentService,public dialog : MatDialog) {}
  ngOnInit(): void {
      this.studentService.getAllStudents().subscribe(
        response => {
          this.studentList = response;
        },
        error => {
          console.error('error fetching students',error);
          
        }
      )
  }

  addUser() : void{

  }

  updateUser() : void{

  }

  delteUser() : void{
    
  }
}
