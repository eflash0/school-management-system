import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GetUsersComponent } from './user/get-users/get-users.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { authGuard } from './auth.guard';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { AddStudentComponent } from './student/add-student/add-student.component';
import { GetStudentsComponent } from './student/get-students/get-students.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // { path: 'add-user', component: AddUserComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate:[authGuard] },
  { path: 'get-users', component: GetUsersComponent,canActivate:[authGuard]},
  { path: 'navigation-bar', component: NavigationBarComponent},
  { path: 'add-student', component: AddStudentComponent},
  { path: 'get-students', component: GetStudentsComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' } // Default route
];
