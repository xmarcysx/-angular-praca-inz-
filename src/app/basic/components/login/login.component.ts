import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  required = false;

  constructor(private _router: Router) {}

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.required = false;
      console.log(this.loginForm.value);
    } else {
      this.required = true;
    }
  }

  navigateToRegistration() {
    this._router.navigate(['rejestracja']);
  }

  navigateToForgotPassword() {
    this._router.navigate(['zapomnialem-haslo']);
  }

  private initForm() {
    let emailLogin = '';
    let passwordLogin = '';
    let rememberMeLogin = false;

    this.loginForm = new FormGroup({
      email: new FormControl(emailLogin, [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl(passwordLogin, [
        Validators.required,
        Validators.pattern('^.{8,}$'),
      ]),
      rememberMe: new FormControl(rememberMeLogin, Validators.required),
    });
  }
}
