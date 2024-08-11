import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Teacher } from '../teacher';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private url = "http://localhost:8082/teachers";

  constructor(private http : HttpClient) { }

  getTeacherById(teacherId : number) : Observable<any>{
    const stdUrl = `${this.url}/${teacherId}`;
    const headers = new HttpHeaders().set('Authorization' , `Bearer ${localStorage.getItem('token')}`);
    return this.http.get<any>(stdUrl,{ headers });
  }

  addTeacher(teacher : Teacher) : Observable<any> {
    const headers = new HttpHeaders().set('Authorization' , `Bearer ${localStorage.getItem('token')}`);
    return this.http.post<any>(this.url,teacher,{ headers })
  }

  getAllTeachers() : Observable<any>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.http.get(this.url,{ headers });
  }

  updateTeacher(id : number,teacher : Teacher) : Observable<any>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    const updateUrl = `${this.url}/${id}`;
    return this.http.put<any>(updateUrl,teacher,{ headers })
  }

  deleteTeacher(id : number) : Observable<any>{
    const deleteUrl = `${this.url}/${id}`;
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.http.delete<any>(deleteUrl,{ headers });
  }

  registerTeacherInClassroom(teacherId:number,classroomId:number) : Observable<any>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    const regUrl = `${this.url}/${teacherId}/classrooms/${classroomId}`;
    return this.http.post<any>(regUrl,{ headers });
  }

  unregisterTeacherFromClassroom(teacherId:number,classroomId:number) : Observable<any>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    const unregUrl = `${this.url}/${teacherId}/classrooms/${classroomId}`;
    return this.http.delete<any>(unregUrl,{ headers });
  }

  getTeacherClassrooms(teacherId : number ) : Observable<any>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    const classroomsUrl = `${this.url}/${teacherId}/classrooms`;
    return this.http.get<any>(classroomsUrl,{ headers });
  }

}
