import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Group} from "../../models/group/group";
import {environment} from "../../../environments/environment";

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

  getNavigateUrl(id: number): string {
    return this.baseUrl + '/' + id;
  }
}
