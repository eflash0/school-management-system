import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../student';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private url = "http://localhost:8082/students";

  constructor(private http : HttpClient) { }

  addStudent(student : Student) : Observable<any> {
    const headers = new HttpHeaders().set('Authorization' , `Bearer ${localStorage.getItem('token')}`);
    return this.http.post<any>(this.url,student,{ headers })
  }

  getAllStudents() : Observable<any>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.http.get(this.url,{ headers });
  }

  updateStudent(id : number,student : Student) : Observable<any>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    const updateUrl = `${this.url}/${id}`;
    return this.http.put<any>(updateUrl,student,{ headers })
  }

  deleteStudent(id : number) : Observable<any>{
    const deleteUrl = `${this.url}/${id}`;
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.http.delete<any>(deleteUrl,{ headers });
  }

}
