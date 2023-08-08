import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  required = false;

  constructor() {}

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

  private initForm() {
    let emailLogin = '';
    let passwordLogin = '';
    let rememberMeLogin = false;

    this.loginForm = new FormGroup({
      email: new FormControl(emailLogin, Validators.required),
      password: new FormControl(passwordLogin, Validators.required),
      rememberMe: new FormControl(rememberMeLogin, Validators.required),
    });
  }
}
