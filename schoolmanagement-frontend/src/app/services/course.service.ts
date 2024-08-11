import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private url = "http://localhost:8082/courses";
  constructor(private http : HttpClient) { }

  addCourse(course : any) : Observable<any>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.http.post<any>(this.url,course,{ headers });
  }

  getCourses() : Observable<any>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.http.get<any>(this.url,{ headers });
  }

  getCourseById(id : number) : Observable<any>{
    const idUrl = `${this.url}/${id}`; 
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.http.get<any>(idUrl,{ headers });
  }

  updateCourse(idCourse : number ,course : any) : Observable<any>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    const updateUrl = `${this.url}/${idCourse}`;
    return this.http.put<any>(updateUrl,course,{ headers });
  }

  deleteCourse(idCourse : number) : Observable<any>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    const deleteUrl = `${this.url}/${idCourse}`;
    return this.http.delete<any>(deleteUrl,{ headers });
  }
}
