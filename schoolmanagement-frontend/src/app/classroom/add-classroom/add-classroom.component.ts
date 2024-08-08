import { Component } from '@angular/core';
import { ClassroomService } from '../../services/classroom.service';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Classroom } from '../../classroom';

@Component({
  selector: 'app-add-classroom',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-classroom.component.html',
  styleUrl: './add-classroom.component.css'
})
export class AddClassroomComponent {
  classroom : Classroom = new Classroom();
  constructor(private classroomService : ClassroomService,public dialogRef : MatDialogRef<AddClassroomComponent>) {}
  addClassroom() : void{
    this.classroomService.addClassroom(this.classroom).subscribe(
      response => {
        console.log('classroom added successfully',response);
        this.dialogRef.close();
      },
      error => {console.error('error adding classroom',error);}
    )
  }

  onCancel() : void{
    this.dialogRef.close();
  }
}
