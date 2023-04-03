import {Component, OnInit} from '@angular/core';
import {StudentServiceService} from "../../services/student-service/student-service.service";
import {Student} from '../../classes/Student'


@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {

  students: Array<Student> = [];
  constructor(private studentService: StudentServiceService) {
  }

  ngOnInit(): void {
    this.createStudents();
  }

  createStudents() {
    let student1 = new Student(1, 'Ivan', new Date("2009-05-27"), 1);
    let student2 = new Student(2, 'Elena', new Date("1909-05-27"), 2);
    let student3 = new Student(3, 'George', new Date("1999-05-27"), 3);

    this.students = [student1, student2, student3];
  }
}
