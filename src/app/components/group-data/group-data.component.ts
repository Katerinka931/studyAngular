import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GroupServiceService} from "../../services/group-service/group-service.service";
import {Group} from "../../models/group/group";

@Component({
  selector: 'app-group-data',
  templateUrl: './group-data.component.html',
  styleUrls: ['./group-data.component.css']
})
export class GroupDataComponent implements OnInit {

  group: Group = {};

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
      }, error: (e) => {
        console.log(e);
        confirm('Ошибка сервера \nСтатус ошибки ' + e.status)
      }
    });
  }
}

