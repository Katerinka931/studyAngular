import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Student} from "../../models/Student";
import {throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {
  private baseUrl = environment.apiUrl + "/students"

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

  getAll() {
    return this.http.get<Student[]>(this.baseUrl).pipe(
      catchError(this.handleError)
    );
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  search(value: string) {
    return this.http.get<Student[]>(`${this.baseUrl}/${value}`).pipe(
      catchError(this.handleError)
    );
  }
}
