import { Course } from "./course";

export class Teacher{
    firstName : String;
    lastName : String;
    joinDate : String;
    nationalCode : String;
    course?: Course;
    classrooms? : String[];
    constructor(
        firstName: string,lastName: string,joinDate: string,nationalCode: string,
        classrooms: string[]) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.joinDate = joinDate;
        this.nationalCode = nationalCode;
        this.classrooms = classrooms;
      }
}