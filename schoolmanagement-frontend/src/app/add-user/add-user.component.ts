import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../user'
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent implements OnInit{
  user : User = new User('','','');

  constructor(private userService : UserService,private router : Router
    ,public dialogRef:MatDialogRef<AddUserComponent>){ }
  ngOnInit(): void {

  }
  addUser() : void{
    this.user.role = this.user.role.toUpperCase();
    this.userService.addUser(this.user).subscribe(
      response => { console.log('user added successfully',response);
        this.dialogRef.close();
      },
      error => {console.error("error adding user",error);}
    );
  }
  onCancel() : void{
    this.dialogRef.close();
  }
}
