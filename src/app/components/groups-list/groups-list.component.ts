import {Component, OnInit} from '@angular/core';
import {GroupServiceService} from "../../services/group-service/group-service.service";
import {Router} from "@angular/router";
import {Group} from "../../models/Group";

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent implements OnInit {
  group: Group = {};
  groups: Group[] = [];
  isGroups: boolean = false;

  constructor(private groupService: GroupServiceService, private router: Router) {
  }

  ngOnInit(): void {
    this.retrieve();
  }

  retrieve() {
    this.groupService.getAllGroups().subscribe({
      next: data => {
        this.groups = data;
        this.isGroups = this.groups.length != 0;
      }, error(e) {
        console.log(e)
      }
    });
  }

  openGroup(id: number) {
    this.router.navigate([`/api/groups/${id}`]);
  }

  createGroup() {
    this.groupService.createGroup(this.group).subscribe({
      next: () => {
        this.retrieve();
      },
      error: () => {
        confirm('Группа с таким номером уже существует')
      }
    });
  }

  deleteGroup(id: number) {
    this.groupService.delete(id).subscribe({
      next: () => {
        this.retrieve();
        confirm('Группа удалена')
      },
      error: (e) => {
        console.error(e);
        confirm('Удаление не удалось')
      }
    });
  }
}
