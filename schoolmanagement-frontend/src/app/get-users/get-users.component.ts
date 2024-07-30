import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-get-users',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './get-users.component.html',
  styleUrl: './get-users.component.css'
})
export class GetUsersComponent implements OnInit{
  userList : any;
  constructor(private userService : UserService,private router : Router,public dialog : MatDialog){}

  ngOnInit(): void {
      this.userService.getALlUsers().subscribe(
        response => { this.userList = response;
          // console.log(this.userList.length);
         } ,
        error => { console.log("error during the fetching of data"); }
      );
      console.log(localStorage.getItem('token'));
  }

  openAddUserDialog() : void{
    const dialogRef = this.dialog.open(AddUserComponent , {width : '400px',height:'400px'});
    dialogRef.afterClosed().subscribe(
      response => {
        console.log('dialog was closed');
        this.ngOnInit();
      }
    )
  }

  openUpdateUserDialog(user : any) : void {
    const dialogRef = this.dialog.open(UpdateUserComponent,{width:'400px',height:'400px',data:user});
    dialogRef.afterClosed().subscribe(
      response => {
        console.log('dialog was closed');
        this.ngOnInit();
      }
    )
  }

  deleteUser(userId : number) : void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{width : '300px',height : '300px'});
    dialogRef.afterClosed().subscribe(
      result => 
        {
          if(result){
            this.userService.deleteUser(userId).subscribe(
              response => {
                console.log('deleted successfully',response);
                this.ngOnInit();
              } ,
              error => {error.log('error deleting user');}
            )
          }
        }
    )
  }
  
}
