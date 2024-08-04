import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavigationBarComponent } from "./navigation-bar/navigation-bar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationBarComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'languagecenter-frontend';
  showNavBar = true;
  constructor(private router : Router){}
  ngOnInit(): void {
    this.router.events.subscribe(
      event => {
        if(event instanceof NavigationEnd){
          this.showNavBar = !event.urlAfterRedirects.includes('/login');
        }
      });
  }
}
