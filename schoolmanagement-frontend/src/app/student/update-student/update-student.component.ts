import { Component, Inject } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-student',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-student.component.html',
  styleUrl: './update-student.component.css'
})
export class UpdateStudentComponent {
  student : any;
  constructor(private studentService : StudentService,public dialogRef : MatDialogRef<UpdateStudentComponent>,
  @Inject(MAT_DIALOG_DATA) public data : any) {
    this.student = {...data};
  }

  updateStudent() : void{
    this.studentService.updateStudent(this.student.studentId,this.student).subscribe(
      response => {
        console.log('student updated successfully',response);
        this.dialogRef.close();
      },
      error => {console.error('error updating student',error);
      }
    )
  }

  onCancel() : void{
    this.dialogRef.close();
  }
}
