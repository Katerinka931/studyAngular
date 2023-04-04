import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {groups} from "../../groups";

@Component({
  selector: 'app-group-data',
  templateUrl: './group-data.component.html',
  styleUrls: ['./group-data.component.css']
})
export class GroupDataComponent implements OnInit {

  group: any; //todo set type Group
  groups = groups;
  isStudents: boolean = false;

  constructor(private route: ActivatedRoute,) {
  }

  ngOnInit(): void {
    this.getGroup();
  }

  getGroup() {
    let id = this.route.snapshot.params["group"];
    this.group = this.groups.find(function (item) {
      return item.id == id;
    })

    this.group.students.length == 0 ? this.isStudents = false :this.isStudents = true;
  }

  createStudent() {

  }

  updateStudent(id: number) {

  }

  deleteStudent(id: number) {

  }

  updateGroup(id: number) {

  }

  deleteGroup() {

  }
}

