import {Component, OnInit} from '@angular/core';
import {StudentServiceService} from "../../services/student-service/student-service.service";
import {Student} from "../../models/student/student";
import {Group} from "../../models/group/group";
import {GroupServiceService} from "../../services/group-service/group-service.service";

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {

  students?: Student[];
  groups: Group[] = [];
  prev_id: number = 0;
  isStudents: boolean = false;

  constructor(private studentService: StudentServiceService, private groupService: GroupServiceService) {
  }

  ngOnInit(): void {
    this.reload()
  }

  reload() {
    this.getGroups();
    this.getStudents();

    this.setSelectedGroup(this.students!);
  }

  getStudents() {
    this.studentService.getAll().subscribe({
      next: (data) => {
        this.students = data;
        this.isStudents = this.students.length != 0
        this.setSelectedGroup(this.students!);
      }, error: (e) => {
        console.log(e);
      }
    });
  }

  private getGroups() {
    this.groupService.getAllGroups().subscribe({
      next: data => {
        this.groups = data;
        this.setSelectedGroup(this.students!);
      }, error(e) {
        console.log(e)
      }
    });
  }

  updateStudent(id: number) {
    let name = document.getElementById("name" + id) as HTMLInputElement;
    let birthdate = document.getElementById("date" + id) as HTMLInputElement;
    let num = document.getElementById("number" + id) as HTMLInputElement;
    let group = document.getElementById("group" + id) as HTMLInputElement;
    let group_id = this.getSelectedGroup(group.value);

    const data = {
      name: name.value,
      number: Number(num.value),
      birthdate: new Date(birthdate.value),
    };

    this.groupService.updateStudent(group_id!, id, data).subscribe({
      next: () => {
        this.getStudents();
        confirm('Редактирование успешно')
      },
      error: () => {
        confirm('Студент с таким именем или номером уже существует')
      }
    });
  }

  deleteStudent(id: number) {
    this.studentService.delete(id).subscribe({
      next: () => {
        this.getStudents();
        confirm('Удаление успешно')
      },
      error: () => {
        confirm('Не удалось удалить студента')
      }
    });
  }

  createStudent() {
    let name = document.getElementById("name") as HTMLInputElement;
    let birthdate = document.getElementById("date") as HTMLInputElement;
    let num = document.getElementById("number") as HTMLInputElement;
    let group = document.getElementById("group") as HTMLInputElement;
    let group_id = this.getSelectedGroup(group.value);

    const data = {
      name: name.value,
      number: Number(num.value),
      birthdate: new Date(birthdate.value)
    }

    this.groupService.createStudent(group_id!, data).subscribe({
      next: () => {
        this.getStudents();
      },
      error: (e) => {
        e.status == 415 ? confirm('Введите дату рождения!') : confirm('Студент с такими именем или номером уже существует')
      }
    });
  }

  search() {
    let name = document.getElementById("search") as HTMLInputElement;
    this.getGroups();
    this.studentService.search(name.value).subscribe({
      next: (data) => {
        this.students = data;
        this.isStudents = this.students.length != 0
      }, error: (e) => {
        console.log(e);
      }
    });
    this.setSelectedGroup(this.students!);
  }

  enableEdit(id: number) {
    this.enable_disable(id, false);
    if (this.prev_id != 0)
      this.enable_disable(this.prev_id, true);
    this.prev_id = id;
  }

  enable_disable(id: number, flag: boolean) {
    let name = document.getElementById("name" + id) as HTMLInputElement;
    let birthdate = document.getElementById("date" + id) as HTMLInputElement;
    let num = document.getElementById("number" + id) as HTMLInputElement;
    let group = document.getElementById("group" + id) as HTMLInputElement;
    let save_btn = document.getElementById("save" + id) as HTMLInputElement;
    let edit_btn = document.getElementById("edit" + id) as HTMLInputElement;

    save_btn.hidden = flag;
    edit_btn.hidden = !flag;
    name.disabled = flag;
    birthdate.disabled = flag;
    num.disabled = flag;
    group.disabled = flag;
  }

  private setSelectedGroup(students: Student[]) {
    for (var i in students) {
      let group_id = students[i].group_id!;
      if (group_id != 0) {
        students[i].selectedGroup = this.groups.find(function (item) {
          return item.id == group_id;
        })!;
      }
    }
  }

  private getSelectedGroup(selector: string) {
    let group = this.groups.find(function (item) {
      return item.name == selector;
    })!;
    return group.id;
  }

  reset() {
    this.getStudents()
  }
}
