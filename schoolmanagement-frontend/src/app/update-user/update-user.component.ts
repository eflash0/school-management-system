import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../user';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent implements OnInit{
  user : any;
  password : String = '';
  constructor(private userService : UserService,public dialogRef : MatDialogRef<UpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any){
      this.user = {...data}; //to create new object and not reference the same one
  }

  ngOnInit(): void {
      
  }

  onCancel() : void {
    this.dialogRef.close();
  }

  updateUser() : void{
    // this.user.role=this.user.role.toUppekrCase();
    const user1 : User = new User(this.user.username,this.password,this.user.role);
    console.log(user1);
    this.userService.updateUser(this.user.userId,user1).subscribe(
      response => {
        console.log('user updated successfully',response);
        this.dialogRef.close();
      },
      error => {console.log('error updating user',error);
        // console.log(this.user);
      }

    )
  }
}
