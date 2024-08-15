import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GetUsersComponent } from './user/get-users/get-users.component';
import { authGuard } from './auth.guard';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { AddStudentComponent } from './student/add-student/add-student.component';
import { GetStudentsComponent } from './student/get-students/get-students.component';
import { GetCoursesComponent } from './course/get-courses/get-courses.component';
import { StudentDetailsComponent } from './student/student-details/student-details.component';
import { GetTeachersComponent } from './teacher/get-teachers/get-teachers.component';
import { TeacherDetailsComponent } from './teacher/teacher-details/teacher-details.component';
import { GetClassroomsComponent } from './classroom/get-classrooms/get-classrooms.component';
import { ClassroomDetailsComponent } from './classroom/classroom-details/classroom-details.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate:[authGuard] },
  { path: 'get-users', component: GetUsersComponent,canActivate:[authGuard]},
  { path: 'navigation-bar', component: NavigationBarComponent},
  { path: 'add-student', component: AddStudentComponent},
  { path: 'get-students', component: GetStudentsComponent,canActivate:[authGuard]},
  { path: 'get-teachers', component: GetTeachersComponent,canActivate:[authGuard]},
  { path: 'get-courses', component: GetCoursesComponent,canActivate:[authGuard]},
  { path: 'student-details', component: StudentDetailsComponent,canActivate:[authGuard]},
  { path: 'teachers/:teacherId/classrooms', component: TeacherDetailsComponent,canActivate:[authGuard]},
  { path: 'get-classrooms', component: GetClassroomsComponent,canActivate:[authGuard]},
  { path: 'classrooms/:classroomId/students', component: ClassroomDetailsComponent,canActivate:[authGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full' } // Default route
];
