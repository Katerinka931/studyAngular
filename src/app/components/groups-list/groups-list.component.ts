import {Component, OnInit} from '@angular/core';
import {GroupServiceService} from "../../services/group-service/group-service.service";
import {Router} from "@angular/router";
import {Group} from "../../models/group/group";

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent implements OnInit {
  group: Group = {};
  groups: Group[] = [];

  constructor(private groupService: GroupServiceService, private router: Router) {
  }

  ngOnInit(): void {
    this.retrieve();
  }

  retrieve() {
    this.groupService.getAllGroups().subscribe({
      next: data => {
        this.groups = data;
      }, error(e) {
        console.log(e)
      }
    });
  }

  openGroup(id: number) {
    this.router.navigate([`/api/groups/${id}`]);
  }

  createGroup() {
    let name = document.getElementById("name") as HTMLInputElement;
    const data = {
      name: name.value.toLowerCase()
    };
    this.groupService.createGroup(data).subscribe({
      next: (res) => {
        this.retrieve();
      },
      error: (e) => {
        console.error(e);
      }
    });
  }

  deleteGroup(id: number) {
    this.groupService.delete(id).subscribe({
      next: (res) => {
        this.retrieve();
      },
      error: (e) => {
        console.error(e);
      }
    });
  }
}
