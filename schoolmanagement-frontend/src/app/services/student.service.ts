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

  getStudentById(studentId : number) : Observable<any>{
    const stdUrl = `${this.url}/${studentId}`;
    const headers = new HttpHeaders().set('Authorization' , `Bearer ${localStorage.getItem('token')}`);
    return this.http.get<any>(stdUrl,{ headers });
  }

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

  getStudentCourses(id : number) : Observable<any>{
    const courseUrl = `${this.url}/${id}/courses`;
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.http.get<any>(courseUrl,{ headers });
  }

  getStudentClassrooms(id : number) : Observable<any>{
    const courseUrl = `${this.url}/${id}/classrooms`;
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.http.get<any>(courseUrl,{ headers });
  }

  registerStudentInCourse(studentId:number,courseId:number) : Observable<any>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    const regUrl = `${this.url}/${studentId}/courses/${courseId}`;
    return this.http.post<any>(regUrl,{ headers });
  }

  unregisterStudentFromCourse(studentId:number,courseId:number) : Observable<any>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    const unregUrl = `${this.url}/${studentId}/courses/${courseId}`;
    return this.http.delete<any>(unregUrl,{ headers });
  }

  registerStudentInClassroom(studentId:number,classroomId:number) : Observable<any>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    const regUrl = `${this.url}/${studentId}/classrooms/${classroomId}`;
    return this.http.post<any>(regUrl,{ headers });
  }

  unregisterStudentFromClassroom(studentId:number,classroomId:number) : Observable<any>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    const unregUrl = `${this.url}/${studentId}/classrooms/${classroomId}`;
    return this.http.delete<any>(unregUrl,{ headers });
  }

  countCoursesByStudent(studentId : number) : Observable<number>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    const countUrl = `${this.url}/${studentId}/courses/count`;
    return this.http.get<any>(countUrl,{ headers });
  }

  countClassroomsByStudent(studentId : number) : Observable<number>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    const countUrl = `${this.url}/${studentId}/classrooms/count`;
    return this.http.get<any>(countUrl,{ headers });
  }
}
