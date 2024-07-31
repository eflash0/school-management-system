import { Component, OnInit } from '@angular/core';
import { Student } from '../../student';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.css'
})
export class AddStudentComponent implements OnInit {
  student : Student = new Student('','','','',[]);
  constructor (public dialogRef : MatDialogRef<AddStudentComponent>,private studentService : StudentService) { }

  ngOnInit(): void {
      
  }
  
  addStudent() : void{
    this.studentService.addStudent(this.student).subscribe(
      response => {
        console.log('student added successfuly',response);
        this.dialogRef.close();
      },
      error => {console.error('error adding student',error);
      }
    )
  }

  onCancel() : void{
    this.dialogRef.close();
  }
}
