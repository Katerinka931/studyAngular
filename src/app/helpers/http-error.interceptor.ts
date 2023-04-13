import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {AuthService} from "../services/auth-service/auth.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status == 401 || err.status == 403) {
        // this.authenticationService.logout();
        return throwError(() => error);
      }
      const error = err.error.message || err.statusText;
      return throwError(() => error);
    }))
  }
}

export const errorInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
];
