import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private url = 'http://localhost:8082/dashboard';
  constructor(private http : HttpClient) { }
  
  countStudents() : Observable<number>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    const stdUrl = `${this.url}/studentsCount`;
    return this.http.get<number>(stdUrl,{ headers });
  }

  countUsers() : Observable<number>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    const userUrl = `${this.url}/usersCount`;
    return this.http.get<number>(userUrl,{ headers });
  }

  countClassrooms() : Observable<number>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    const classUrl = `${this.url}/classroomsCount`;
    return this.http.get<number>(classUrl,{ headers });
  }

  countTeachers() : Observable<number>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    const teacherUrl = `${this.url}/teachersCount`;
    return this.http.get<number>(teacherUrl,{ headers });
  }

  countCourses() : Observable<number>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    const courseUrl = `${this.url}/coursesCount`;
    return this.http.get<number>(courseUrl,{ headers });
  }
}
