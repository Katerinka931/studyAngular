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
    let name = document.getElementById("name") as HTMLInputElement;
    const data = {
      name: name.value.toLowerCase()
    };
    this.groupService.createGroup(data).subscribe({
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
