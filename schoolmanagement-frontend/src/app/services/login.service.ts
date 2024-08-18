import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

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

  getUserRole() : String{
    const token = localStorage.getItem('token');
    if(token){
      const decodeToken : any = jwtDecode(token);
      console.log(decodeToken);
      
      return decodeToken.roles;
    }
    return '';
  }

  isAdmin() : boolean{
    return this.getUserRole() === 'ADMIN';
  }

  logout() {
    localStorage.removeItem('token');
  } 
}
