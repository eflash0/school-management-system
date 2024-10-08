import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-get-users',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './get-users.component.html',
  styleUrl: './get-users.component.css'
})
export class GetUsersComponent implements OnInit{
  userList : any;
  filteredUserList : any;
  constructor(private userService : UserService,public dialog : MatDialog){}

  ngOnInit(): void {
      this.userService.getALlUsers().subscribe(
        response => { this.userList = response;
          this.filteredUserList = this.userList;
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
    );
  }

  openUpdateUserDialog(user : any) : void {
    const dialogRef = this.dialog.open(UpdateUserComponent,{width:'400px',height:'400px',data:user});
    dialogRef.afterClosed().subscribe(
      response => {
        console.log('dialog was closed');
        this.ngOnInit();
      }
    );
  }

  deleteUser(userId : number) : void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      data : {title : 'Delete Confirmation',content : 'Are you sure you want to delete this user?'}
    });
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
            );
          }
        }
    );
  }
  searchUsers(event : Event) : void{
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredUserList = this.userList.filter((user : any) =>{
      return (user.username.toLowerCase().includes(searchTerm));
    });
  }
  
}
