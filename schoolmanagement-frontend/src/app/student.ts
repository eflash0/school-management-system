export class Student{
    firstName : String;
    lastName : String;
    joinDate : String;
    nationalCode : String;
    courses : String[];
    constructor(
        firstName: string,lastName: string,joinDate: string,nationalCode: string,
        courses: string[]) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.joinDate = joinDate;
        this.nationalCode = nationalCode;
        this.courses = courses;
      }
}