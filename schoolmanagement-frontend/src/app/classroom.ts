import { Student } from "./student";
import { Teacher } from "./teacher";

export class Classroom {
    name: string;
    room: string;
    students: Student[];
    teacher?: Teacher;
    course?: Classroom;
  
    constructor() {
      this.name = '';
      this.room = '';
      this.students = [];
    }
  }
  