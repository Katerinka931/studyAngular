import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth-service/auth.service";
import {environment} from "../../environments/environment";


@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = this.authenticationService.userValue;
    const isLoggedIn = user?.authdata;
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        headers: request.headers.set(
          'Authorization',
          `Basic ${user.authdata}`
        )
        // setHeaders: {
        //   'Access-Control-Allow-Origin': '*',
        //   Authorization: `Basic ${user.authdata}`
        // }
      });
    }
    return next.handle(request);
  }
}

export const authInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true}
];
