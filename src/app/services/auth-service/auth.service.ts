import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";
import {Router} from "@angular/router";
import {User} from "../../models/User";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.apiUrl + "/auth"

  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(this.baseUrl + '/login', {
      username,
      password
    })
      .pipe(map(user => {
        user.authdata = btoa(username + ':' + password);  //window.
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  register(username: string, password: string) {
    let role = 'ROLE_USER';
    return this.http.post<any>(this.baseUrl + '/register', {
      username,
      password,
      role,
    })
      .pipe(map(user => {
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/']);
  }
}
