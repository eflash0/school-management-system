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

  getClassroomById(classroomId : number) : Observable<any>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    const classUrl = `${this.url}/${classroomId}`;
    return this.http.get<any>(classUrl,{ headers })
  }

  getClassrooms() : Observable<any>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.http.get<any>(this.url,{ headers });
  }

  countStudentsByClassroom(classroomId : number) : Observable<number>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    const countUrl = `${this.url}/${classroomId}/students/count`;
    return this.http.get<any>(countUrl,{ headers });
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

  getClassroomStudents(classroomId : number) : Observable<any>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    const studentsUrl = `${this.url}/${classroomId}/students`;
    return this.http.get<any>(studentsUrl,{ headers })
  } 

  registerStudentInClassroom(classroomId : number,studentId : number) : Observable<any>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    const regUrl = `${this.url}/${classroomId}/students/${studentId}`;
    return this.http.post<any>(regUrl,null,{ headers });
  }

  unregisterStudentFromClassroom(classroomId : number,studentId : number) : Observable<any>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    const unregUrl = `${this.url}/${classroomId}/students/${studentId}`;
    return this.http.delete<any>(unregUrl,{ headers });
  }
}
