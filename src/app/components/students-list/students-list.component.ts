import {Component, OnInit} from '@angular/core';
import {StudentServiceService} from "../../services/student-service/student-service.service";
import {students} from "../../students";


@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {

  students = students;
  seq = students.length + 1;

  constructor(private studentService: StudentServiceService) {
  }

  ngOnInit(): void {
  }

  updateStudent(id: number) { // todo добавить редактирование по группе
    let name = document.getElementById("name" + id) as HTMLInputElement;
    let birthdate = document.getElementById("date" + id) as HTMLInputElement;
    let num = document.getElementById("number" + id) as HTMLInputElement;

    this.students.forEach((item, index)=>{
      if (item.id == id) this.students.splice(index, 1, {id: id, name: name.value, birthdate: new Date(birthdate.value), num: Number(num.value)});
    })
  }

  deleteStudent(id: number) {
    this.students.forEach((item, index)=>{
      if (item.id == id) this.students.splice(index, 1);
    })
  }

  createStudent() {
    let name = document.getElementById("name") as HTMLInputElement;
    let birthdate = document.getElementById("date") as HTMLInputElement;
    let num = document.getElementById("number") as HTMLInputElement;

    this.students.push({id: this.seq, name: name.value, birthdate: new Date(birthdate.value), num: Number(num.value)})
    this.seq += 1;
  }
}

// createStudents() {
//   let student1 = new Student(1, 'Ivan', new Date("2009-05-27"), 1);
//   let student2 = new Student(2, 'Elena', new Date("1909-05-27"), 2);
//   let student3 = new Student(3, 'George', new Date("1999-05-27"), 3);
//
//   this.students = [student1, student2, student3];
// }
