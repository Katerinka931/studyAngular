import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth-service/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  loading = false;
  error = '';
  success = '';

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      password_repeat: ['', Validators.required],
    });
  }

  get formData() {
    return this.registerForm.controls;
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    this.error = '';
    this.success = '';
    this.loading = true;

    if (this.formData['password'].value == this.formData['password_repeat'].value) {
      this.authService.register(this.formData['username'].value, this.formData['password'].value)
        .pipe(first())
        .subscribe({
          next: () => {
            this.success = 'Регистрация выполнена успешно';
            this.loading = false;
          },
          error: error => {
            this.error = "Пользователь с таким логином уже существует";
            this.loading = false;
          }
        });
    } else {
      this.error = 'Пароли не совпадают';
      this.loading = false;
    }
  }
}
