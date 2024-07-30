import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // @Output() onSubmitLoginEvent = new EventEmitter();
  login : String = "";
  password : String = "";
  loginFailed: boolean = false;
  errorMessage: string = "";
  
  constructor(private loginService : LoginService,private router : Router){}

  onSubmitLogin() : void{
    // this.onSubmitLoginEvent.emit({"login" : this.login,"password" : this.password});
    const loginData = {username: this.login,password: this.password};
    console.log(this.login);
    this.loginService.login(this.login,this.password)
    .subscribe(response => {console.log("login successful", response);
      localStorage.setItem('token',response.token);
      if(localStorage.getItem('token')!==null){
        this.router.navigate(['/dashboard'])
      }
    }, error => {console.error("login failed",error);
      this.loginFailed = true;
      this.errorMessage = "Login failed. Please check your credentials and try again";
    })
  }
}
