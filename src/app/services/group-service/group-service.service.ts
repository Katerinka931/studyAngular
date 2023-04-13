import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {environment} from "../../../environments/environment";
import {Student} from "../../models/Student";
import {Group} from "../../models/Group";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class GroupServiceService {
  private baseUrl = environment.apiUrl + "/groups"

  constructor(private http: HttpClient) {
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Ошибка на стороне клиента:', error.error);
    } else {
      console.error(
        `Ошибка сервера с кодом ${error.status}, ошибка: `, error.error);
    }
    return throwError(() => new Error('Что-то пошло не так, попробуйте еще раз позже.'));
  }

  getAllGroups = (): Observable<Group[]> => {
    return this.http.get<Group[]>(this.baseUrl).pipe(
      catchError(this.handleError)
    );
  };

  getGroup(id: any) {
    return this.http.get<Group>(`${this.baseUrl}/id/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  updateGroup(id: number, data: Group) {
    return this.http.put<Group>(`${this.baseUrl}/${id}`, data).pipe(
      catchError(this.handleError)
    );
  }

  createGroup(data: Group) {
    return this.http.post(this.baseUrl, data).pipe(
      catchError(this.handleError)
    );
  }


  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  updateStudent(group_id: number, id: number, data: Student) {
    return this.http.put(`${this.baseUrl}/${group_id}/students/${id}`, data).pipe(
      catchError(this.handleError)
    );
  }

  createStudent(group_id: number, data: Student) {
    return this.http.post(`${this.baseUrl}/${group_id}/students`, data).pipe(
      catchError(this.handleError)
    );
  }
}
