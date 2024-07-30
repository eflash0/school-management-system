import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = 'http://localhost:8082/login';
  constructor(private http : HttpClient) { }
  login(username : String,password : String) : Observable<any>{
    return  this.http.post(this.loginUrl,{username,password});
  }

  validateToken() : Observable<boolean>{
    const tokenUrl = 'http://localhost:8082/validate-token';
    const token = localStorage.getItem('token');
    return this.http.post<boolean>(tokenUrl,token);
  }

  logout() {
    localStorage.removeItem('token');
  } 
}
