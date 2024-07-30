import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "http://localhost:8082/users";
  
  constructor(private http : HttpClient) { }

  addUser(user:User) : Observable<any>{
    const headers = new HttpHeaders().set('Authorization' , `Bearer ${localStorage.getItem('token')}`);
    return this.http.post<any>(this.url,user,{ headers });
  }

  getALlUsers() : Observable<any>{
    const headers = new HttpHeaders().set('Authorization' , `Bearer ${localStorage.getItem('token')}`);
    return this.http.get<any>(this.url,{ headers });
  }

  updateUser(id : number,user : User) : Observable<any>{
    const headers = new HttpHeaders().set('Authorization' , `Bearer ${localStorage.getItem('token')}`);
    const updateUrl = `http://localhost:8082/users/${id}`;
    console.log(user.username);
    console.log(user);
    return this.http.put<any>(updateUrl,user,{ headers });
  }

  deleteUser(id : number){
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    const deleteUrl = `http://localhost:8082/users/${id}`;
    return this.http.delete<any>(deleteUrl,{ headers });
  }
}
