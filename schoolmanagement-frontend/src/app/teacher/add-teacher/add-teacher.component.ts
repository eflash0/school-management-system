import { Component, OnInit } from '@angular/core';
import { Teacher } from '../../teacher';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TeacherService } from '../../services/teacher.service';

@Component({
  selector: 'app-add-teacher',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-teacher.component.html',
  styleUrl: './add-teacher.component.css'
})
export class AddTeacherComponent implements OnInit {
  teacher : Teacher = new Teacher('','','','',[]);
  constructor (public dialogRef : MatDialogRef<AddTeacherComponent>,private teacherService : TeacherService) { }

  ngOnInit(): void {
      
  }
  
  addTeacher() : void{
    this.teacherService.addTeacher(this.teacher).subscribe(
      response => {
        console.log('teacher added successfuly',response);
        this.dialogRef.close();
      },
      error => {console.error('error adding teacher',error);
      }
    )
  }

  onCancel() : void{
    this.dialogRef.close();
  }
}
