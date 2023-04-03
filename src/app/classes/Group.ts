import {Student} from "./Student";

export class Group {
  id: number;
  name: string;
  students: Student[];

  constructor(id: number, name: string);
  constructor(id: number, name: string, students: Student[]);

  constructor(id: number, name: string, students?: Student[]) {
    this.id = id;
    this.name = name;
    this.students = students ?? [];
  }
}
