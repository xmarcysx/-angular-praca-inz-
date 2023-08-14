import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  required = false;
  loadingBall = false;

  constructor(
    private _router: Router,
    private _messageService: MessageService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      this.loadingBall = true;
      this.required = false;
      try {
        await this._loginUser();
      } catch (error) {
        this.loadingBall = false;
        this._showError('Błąd', 'Wystąpił błąd podczas logowania');
      }
      this._resetForm();
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

  private _showError(summary: string, detail: string) {
    this._messageService.add({
      severity: 'error',
      summary: summary,
      detail: detail,
    });
  }

  private _resetForm() {
    this.loginForm.reset();
    this._clearAllErrors();
    setTimeout(() => {
      this.loadingBall = false;
    }, 1500);
  }

  private _clearAllErrors() {
    Object.keys(this.loginForm.controls).forEach((controlName) => {
      this.loginForm.controls[controlName].setErrors(null);
    });
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

  private async _loginUser() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this._authService.signIn(email, password);
  }
}
