import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoginStorageService } from 'src/app/shared/services/login-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hidePassword = true;
  loginForm!: FormGroup;
  required = false;
  loadingBall = false;

  constructor(
    private _router: Router,
    private _messageService: MessageService,
    private _authService: AuthService,
    private _loginStorageService: LoginStorageService
  ) {}

  ngOnInit() {
    this.checkSessionStorage();
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
      this._showSuccess('Sukces', 'Użytkownik został zalogowany');
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

  private _showSuccess(summary: string, detail: string) {
    this._messageService.add({
      severity: 'success',
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
    const rememberMe = this.loginForm.get('rememberMe')?.value;

    this._authService.signIn(email, password);
    if (rememberMe) {
      this._loginStorageService.setLoginStorage(email, password);
    }
  }

  private async checkSessionStorage() {
    const getLoginStorage = this._loginStorageService.getLoginStorage();

    if (getLoginStorage) {
      this.loadingBall = true;
      const loginSessionData = JSON.parse(getLoginStorage);
      const email = loginSessionData.email;
      const password = loginSessionData.password;

      await this._authService.signIn(email, password);
    } else {
      return;
    }
  }
}
