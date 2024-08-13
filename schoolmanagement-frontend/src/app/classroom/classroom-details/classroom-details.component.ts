import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClassroomService } from '../../services/classroom.service';
import { StudentService } from '../../services/student.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-classroom-details',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './classroom-details.component.html',
  styleUrl: './classroom-details.component.css'
})
export class ClassroomDetailsComponent implements OnInit {
  classroomStudents : any;
  classroom : any;
  selectedStudentId : String = '';
  studentsList : any;
  studentsNumber : number = 0;
  constructor(private classroomService : ClassroomService,private studentService : StudentService,
    private route : ActivatedRoute) {}
  ngOnInit(): void {
    this.studentService.getAllStudents().subscribe(
      response => {this.studentsList = response;},
      error => {console.error('error fetching students',error);
      }
    );
    this.classroomService.getClassroomStudents(Number(this.route.snapshot.paramMap.get('classroomId'))).subscribe(
      response => {this.classroomStudents = response;},
      error => {console.error('error fetching students of this class',error);}
    );
  }
  registerStudentInClassroom() : void{
    this.classroomService.re
  }
  unregisterStudentFromClassroom(studentId : number) : void{

  }

}
