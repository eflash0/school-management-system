import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { TeacherService } from '../../services/teacher.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { ClassroomService } from '../../services/classroom.service';

@Component({
  selector: 'app-teacher-details',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './teacher-details.component.html',
  styleUrl: './teacher-details.component.css'
})
export class TeacherDetailsComponent implements OnInit {
  teacherId : number = 0;
  classroomsList : any;
  selectedClassroomId : String = '';
  teacher : any = {};
  teacherClassrooms : any = {};
  classroomsNumber : number = 0;
  constructor (private teacherService:TeacherService,private classroomService : ClassroomService,
    public dialog : MatDialog,private route : ActivatedRoute) {}
  ngOnInit(): void {
      //this.teacherId = history.state.teacherId; // here i should pass the id from get-Teachers and use 
      //TeacherService to get the Teacher to have a the Teacher updated when registered in a course
      // console.log(this.Teacher.courses.length);
      this.teacherId = +this.route.snapshot.paramMap.get('teacherId')!;
      console.log(this.teacherId);
      
      this.teacherService.getTeacherById(this.teacherId).subscribe(
        response => {console.log('Teacher fetched correctly',response);
          this.teacher = response;
        },
        error => {console.error('error fetching Teacher',error);}
      );
      
      this.classroomService.getClassrooms().subscribe(
        response => {console.log('classrooms are fetched',response);
          this.classroomsList = response;
        },
        error => {console.error('error fetching for classrooms',error);
        }
      );
      this.teacherService.getTeacherClassrooms(this.teacherId).subscribe(
        response => {
          this.teacherClassrooms = response;
        },
        error => {console.error('error fetching Teacher classrooms',error);
        }
      );  
      this.teacherService.countClassroomsByTeacher(this.teacherId).subscribe(
        response => {this.classroomsNumber = response;},
        error =>{console.error('error fetching number of classrooms'); }
      );
      
  }

  registerTeacherInClassroom() : void{
    if(this.selectedClassroomId){
      this.teacherService.registerTeacherInClassroom(this.teacher.teacherId,
        Number(this.selectedClassroomId)).subscribe(
          response => {
            console.log('Teacher is successfully registred in the classroom',response);
            this.ngOnInit();
          },
          error => {console.error('error registring Teacher in the classroom',error);
          }
        );
    }
  }
  unregisterTeacherFromClassroom(classroomId : number) : void{
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      data : {title : 'Unregistration Confirmation' , content : 'Are you sure you wanna unregister the teacher from the classroom?'}
    });
    dialogRef.afterClosed().subscribe(
      result => {
        if(result){
          this.teacherService.unregisterTeacherFromClassroom(this.teacher.teacherId,classroomId).subscribe(
            response => {
              console.log('Teacher unregistred from classroom',response);
              this.ngOnInit();
            },
            error => {console.error('error unregistring teacher from classroom',error);
            }
          );
        }
      }
    );  
  }
}
