export class User{
    username : String;
    password : String;
    role : String;

    constructor(private username1:String,private pass1:String,private role1:String){
        this.username=username1;
        this.password=pass1;
        this.role=role1;
    }
}