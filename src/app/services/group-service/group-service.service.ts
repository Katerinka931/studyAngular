import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Student} from "../../models/Student";
import {Group} from "../../models/Group";

@Injectable({
  providedIn: 'root'
})
export class GroupServiceService {
  private baseUrl = environment.apiUrl + "/groups"

  constructor(private http: HttpClient) {
  }

  getAllGroups = (): Observable<Group[]> => {
    return this.http.get<Group[]>(this.baseUrl);
  };

  getGroup(id: any) {
    return this.http.get<Group>(`${this.baseUrl}/id/${id}`);
  }

  updateGroup(id: number, data: Group) {
    return this.http.put<Group>(`${this.baseUrl}/${id}`, data);
  }

  createGroup(data: Group) {
    return this.http.post(this.baseUrl, data);
  }


  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  updateStudent(group_id: number, id: number, data: Student) {
    return this.http.put(`${this.baseUrl}/${group_id}/students/${id}`, data);
  }

  createStudent(group_id: number , data: Student) {
    return this.http.post(`${this.baseUrl}/${group_id}/students`, data);
  }
}
