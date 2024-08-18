import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent {
  isAdmin : boolean;
  constructor(private loginService : LoginService,private router : Router){
    this.isAdmin = loginService.isAdmin();
  }
  logout() : void{
    this.loginService.logout();
    this.router.navigate(['/login']);
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

  goDashboard() : void {
    this.router.navigate(['/dashboard']);
  }
}
