import {Component, OnInit} from '@angular/core';
import {StudentServiceService} from "../../services/student-service/student-service.service";
import {Student} from "../../models/student/student";

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {

  students?: Student[];

  constructor(private studentService: StudentServiceService) {
  }

  ngOnInit(): void {
    this.retrieve();
  }

  retrieve() {
    this.studentService.getAll().subscribe({
      next: (data) => {
        this.students = data;
      }, error: (e) => {
        console.log(e);
      }
    });
  }

  updateStudent(id: number) { // todo добавить редактирование по группе
    let name = document.getElementById("name" + id) as HTMLInputElement;
    let birthdate = document.getElementById("date" + id) as HTMLInputElement;
    let num = document.getElementById("number" + id) as HTMLInputElement;

    const data = {
      name: name.value,
      birthdate: birthdate.value,
      number: num.value
    }

    // this.studentService.updateStudent(id, data);
  }

  deleteStudent(id: number) {
    this.studentService.delete(id);
  }

  createStudent() {
    let name = document.getElementById("name") as HTMLInputElement;
    let birthdate = document.getElementById("date") as HTMLInputElement;
    let num = document.getElementById("number") as HTMLInputElement;

    const data = {
      name: name.value,
      number: num.value,
      birthdate: birthdate.value
    }

    // this.studentService.createStudent(data);
  }

  search() {
    let name = document.getElementById("search") as HTMLInputElement;

    this.studentService.search(name.value).subscribe({
      next: (data) => {
        this.students = data;
      }, error: (e) => {
        console.log(e);
      }
    });
  }
}
