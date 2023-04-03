
export class Student {
  id: number;
  name: string;
  birthdate: Date;
  num: number;

  constructor(id: number, name: string, birthdate: Date, num: number) {
    this.id = id;
    this.name = name;
    this.birthdate = birthdate;
    this.num = num;
  }
}
