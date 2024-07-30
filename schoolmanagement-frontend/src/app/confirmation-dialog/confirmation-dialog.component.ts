import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.css'
})
export class ConfirmationDialogComponent {
  constructor(public dialogRef : MatDialogRef<ConfirmationDialogComponent>){ }

  cancelDelete() : void {
    this.dialogRef.close(false);
  }  

  confirmDelete() : void{
    this.dialogRef.close(true);
  }

}

