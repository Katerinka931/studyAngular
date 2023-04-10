import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GroupServiceService} from "../../services/group-service/group-service.service";
import {Student} from "../../models/Student";
import {Group} from "../../models/Group";

@Component({
  selector: 'app-group-data',
  templateUrl: './group-data.component.html',
  styleUrls: ['./group-data.component.css']
})
export class GroupDataComponent implements OnInit {

  group: Group = {};
  students: Student[] = [];
  isStudents: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private groupService: GroupServiceService) {
  }

  ngOnInit(): void {
    this.retrieve();
  }

  retrieve() {
    let id = this.route.snapshot.params["group"];
    this.groupService.getGroup(id).subscribe({
        next: (data) => {
          this.group = data;
          this.students = data['students']!;
          this.isStudents = this.students.length != 0;
        }, error: (e) => {
          confirm('Ошибка сервера \nСтатус ошибки ' + e.status)
        }
    });
  }

  updateGroup(id: number) {

    this.groupService.updateGroup(id, this.group).subscribe({
      next: (data) => {
        this.group = data;
        confirm('Сохранение успешно')
      }, error: (e) => {
        confirm('Такая группа уже существует')
      }
    });
  }
}

