import { Component } from '@angular/core';
import {AuthService} from "./services/auth-service/auth.service";
import {NavigationStart, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'studyAngular';
  showNav: boolean = false;
  role = '' as string;

  constructor(private authService: AuthService, private authenticationService: AuthService, private router: Router) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        this.showNav = event['url'] != '/' && !event['url'].includes('/auth');
        this.role = authenticationService.userValue?.role!;
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
