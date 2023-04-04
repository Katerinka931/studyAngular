import {Component, OnInit} from '@angular/core';
import {GroupServiceService} from "../../services/group-service/group-service.service";
import {StudentServiceService} from "../../services/student-service/student-service.service";
import {groups} from "../../groups";
import {Router} from "@angular/router";

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent implements OnInit {

  groups = groups;
  seq = groups.length + 1;

  constructor(private groupService: GroupServiceService, private studentService: StudentServiceService, private router: Router) {
  }

  ngOnInit(): void {
  }

  openGroup(id: number) {
    this.router.navigate([`/api/groups/${id}`]);
  }

  createGroup() {
    let name = document.getElementById("name") as HTMLInputElement;
    this.groups.push({id: this.seq, name: name.value, students: []})
    this.seq += 1;
  }
}

// createGroups() {
//   let student1 = new Student(1, 'Ivan', new Date("2009-05-27"), 1);
//   let student2 = new Student(2, 'Elena', new Date("1909-05-27"), 2);
//   let student3 = new Student(3, 'George', new Date("1999-05-27"), 3);
//
//   let group1 = new Group(1, '6402');
//   let group2 = new Group(2, '6403', [student1, student3]);
//   let group3 = new Group(3, '6404', [student2]);
//
//   this.groups = [group2, group1, group3]
// }
