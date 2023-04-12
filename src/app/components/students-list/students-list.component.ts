import {Component, OnInit} from '@angular/core';
import {StudentServiceService} from "../../services/student-service/student-service.service";
import {GroupServiceService} from "../../services/group-service/group-service.service";
import {Student} from "../../models/Student";
import {Group} from "../../models/Group";
import {AuthService} from "../../services/auth-service/auth.service";

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {
  role = '';

  students?: Student[];
  groups: Group[] = [];

  created_student = {} as Student;
  edited_student = {} as Student;

  prev_id: number = 0;
  isStudents: boolean = false;

  constructor(private studentService: StudentServiceService, private groupService: GroupServiceService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.reload();
    this.role = this.authService.userValue!.role!;
  }

  reload() {
    this.getGroups();
    this.getStudents();
  }

  getStudents() {
    this.studentService.getAll().subscribe({
      next: (data) => {
        this.students = data;
        this.isStudents = this.students.length != 0
      }, error: () => {
      }
    });
  }

  private getGroups() {
    this.groupService.getAllGroups().subscribe({
      next: data => {
        this.groups = data;
      }, error() {
      }
    });
  }

  updateStudent(id: number) {
    this.edited_student.name = (document.getElementById("name" + id) as HTMLInputElement).value;
    this.edited_student.birthdate = new Date((document.getElementById("date" + id) as HTMLInputElement).value);
    this.edited_student.number = Number((document.getElementById("number" + id) as HTMLInputElement).value);
    this.edited_student.group_id = Number((document.getElementById("group" + id) as HTMLInputElement).value);

    this.groupService.updateStudent(this.edited_student.group_id!, id, this.edited_student).subscribe({
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
    this.groupService.createStudent(this.created_student.group_id!, this.created_student).subscribe({
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
      }, error: () => {
      }
    });
  }

  enableEdit(id: number) {
    this.toggle_edit(id, false);
    if (this.prev_id != 0)
      this.toggle_edit(this.prev_id, true);
    this.prev_id = id;
  }

  toggle_edit(id: number, flag: boolean) {
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

  reset() {
    this.getStudents()
  }

  getGroupName(group_id: number) {
    let group = this.groups.find(function (item) {
      return item.id == group_id;
    })!;
    return group.name;
  }
}
