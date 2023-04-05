import { Injectable } from '@angular/core';
import {Student} from "../../models/student/student";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {
  private baseUrl = environment.apiUrl + "/students"
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Student[]>(this.baseUrl);
  }

  updateStudent(id: number, data: Student) {

  }

  delete(id: number) {

  }

  createStudent(data: Student) {

  }

  search(value: string) {
    return this.http.get<Student[]>(`${this.baseUrl}/${value}`);
  }
}
