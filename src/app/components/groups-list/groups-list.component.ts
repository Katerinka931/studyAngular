import {Component, OnInit} from '@angular/core';
import {GroupServiceService} from "../../services/group-service/group-service.service";
import {Router} from "@angular/router";
import {Group} from "../../models/Group";
import {AuthService} from "../../services/auth-service/auth.service";
import {User} from "../../models/User";

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent implements OnInit {
  group: Group = {};
  groups: Group[] = [];
  isGroups: boolean = false;
  user = {} as User;

  constructor(private groupService: GroupServiceService, private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.retrieve();
    this.user = this.authService.userValue!;
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
    return this.router.navigate([`/api/groups/${id}`]);
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
      error: () => {
        confirm('Удаление не удалось')
      }
    });
  }
}
