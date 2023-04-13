import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth-service/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loading = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService
  ) {
    if (this.authenticationService.userValue) {
      this.router.navigate(['/api/groups']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get formData() { return this.loginForm.controls; }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.error = '';
    this.loading = true;

    this.authenticationService.login(this.formData['username'].value, this.formData['password'].value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['/api/groups']);
        },
        error: error => {
          this.error = "Неверно введены учетные данные";
          this.loading = false;
        }
      });
  }
}
