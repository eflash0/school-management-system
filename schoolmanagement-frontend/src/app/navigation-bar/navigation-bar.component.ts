import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent {
  constructor(private loginService : LoginService,private router : Router){ }

  logout() : void{
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
