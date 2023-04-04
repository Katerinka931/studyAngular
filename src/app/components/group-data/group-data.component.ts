import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {groups} from "../../groups";
import {students} from "../../students";

@Component({
  selector: 'app-group-data',
  templateUrl: './group-data.component.html',
  styleUrls: ['./group-data.component.css']
})
export class GroupDataComponent implements OnInit {

  group: any; //todo set type Group
  groups = groups;
  isStudents: boolean = false;

  students = students
  seq = students.length + 1;

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.getGroup();
  }

  getGroup() {
    let id = this.route.snapshot.params["group"];
    this.group = this.groups.find(function (item) {
      return item.id == id;
    })

    this.group.students.length == 0 ? this.isStudents = false : this.isStudents = true;
  }

  createStudent() {
    let name = document.getElementById("name") as HTMLInputElement;
    let birthdate = document.getElementById("date") as HTMLInputElement;
    let num = document.getElementById("number") as HTMLInputElement;

    this.students.push({id: this.seq, name: name.value, birthdate: new Date(birthdate.value), num: Number(num.value)})
    this.group.students.push({
      id: this.seq,
      name: name.value,
      birthdate: new Date(birthdate.value),
      num: Number(num.value)
    })
    this.seq += 1;
  }

  updateStudent(id: number) {
    let name = document.getElementById("name" + id) as HTMLInputElement;
    let birthdate = document.getElementById("date" + id) as HTMLInputElement;
    let num = document.getElementById("number" + id) as HTMLInputElement;

    this.group.students.forEach((item: any, index: any) => {
      if (item.id == id) {
        this.group.students.splice(index, 1, {
          id: id,
          name: name.value,
          birthdate: new Date(birthdate.value),
          num: Number(num.value)
        });
        this.students.splice(index, 1, {
          id: id,
          name: name.value,
          birthdate: new Date(birthdate.value),
          num: Number(num.value)
        });
      }
    })
  }

  deleteStudent(id: number) {
    this.deleteStudents(id);
    this.deleteGroups(id);
  }

  updateGroup(id: number) {
    let name = document.getElementById("group_name") as HTMLInputElement;
    this.groups.forEach((item, index) => {
      if (item.id == id) this.groups.splice(index, 1, {id: id, name: name.value, students: item.students});
    })
  }

  deleteGroup() {
    this.groups.forEach((item, index) => {
      if (item.id == this.group.id) {
        let students = item.students;
        for (var i in students) {
          this.deleteStudents(students[i].id);
        }
        this.groups.splice(index, 1);
      }
    })
    this.router.navigate([`/api/groups`]);
  }

  private deleteStudents(id: number) {
    this.students.forEach((item, index) => {
      if (item.id == id) this.students.splice(index, 1);
    })
  }

  private deleteGroups(id: number) {
    this.group.students.forEach((item: any, index: any) => {
      if (item.id == id) {
        this.group.students.splice(index, 1);
      }
    })
  }
}

