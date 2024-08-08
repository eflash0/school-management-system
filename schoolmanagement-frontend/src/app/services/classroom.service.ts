import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {
  private url = "http://localhost:8082/classrooms";
  constructor(private http : HttpClient) { }

  addClassroom(classroom : any) : Observable<any>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.http.post<any>(this.url,classroom,{ headers });
  }

  getClassrooms() : Observable<any>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.http.get<any>(this.url,{ headers });
  }

  updateClassroom(classroomId : number ,classroom : any) : Observable<any>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    const updateUrl = `${this.url}/${classroomId}`;
    return this.http.put<any>(updateUrl,classroom,{ headers });
  }

  deleteClassroom(classroomId : number) : Observable<any>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    const deleteUrl = `${this.url}/${classroomId}`;
    return this.http.delete<any>(deleteUrl,{ headers });
  }
}
