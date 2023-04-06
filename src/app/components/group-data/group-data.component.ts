import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GroupServiceService} from "../../services/group-service/group-service.service";
import {Group} from "../../models/group/group";
import {Student} from "../../models/student/student";

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
          console.log(e);
          confirm('Ошибка сервера \nСтатус ошибки ' + e.status)
        }
    });
  }

  updateGroup(id: number) {
    let name = document.getElementById("group_name") as HTMLInputElement;
    const data = {
      name: name.value
    }
    this.groupService.updateGroup(id, data).subscribe({
      next: (data) => {
        this.group = data;
        confirm('Сохранение успешно')
      }, error: (e) => {
        console.log(e);
        confirm('Такая группа уже существует')
      }
    });
  }
}

