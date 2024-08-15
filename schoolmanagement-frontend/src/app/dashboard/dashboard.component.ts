import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  usersCount : number = 0;
  studentsCount : number = 0;
  coursesCount : number = 0;
  teachersCount : number = 0;
  classroomsCount : number = 0;
  constructor(private router : Router,private dashboardService : DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.countClassrooms().subscribe(
      response => {this.classroomsCount = response},
      error => {console.error('error fetching number of classrooms',error);}
    );

    this.dashboardService.countCourses().subscribe(
      response => {this.coursesCount = response},
      error => {console.error('error fetching number of courses',error);}
    );

    this.dashboardService.countStudents().subscribe(
      response => {this.studentsCount = response},
      error => {console.error('error fetching number of students',error);}
    );

    this.dashboardService.countTeachers().subscribe(
      response => {this.teachersCount = response},
      error => {console.error('error fetching number of teachers',error);}
    );

    this.dashboardService.countUsers().subscribe(
      response => {this.usersCount = response},
      error => {console.error('error fetching number of users',error);}
    );
  }

  goUsers() : void {
    this.router.navigate(['/get-users']);
  }

  goStudents() : void {
    this.router.navigate(['/get-students']);
  }

  goCourses() : void {
    this.router.navigate(['/get-courses']);
  }

  goTeachers() : void {
    this.router.navigate(['/get-teachers']);
  }

  goClassrooms() : void {
    this.router.navigate(['/get-classrooms']);
  }
}
