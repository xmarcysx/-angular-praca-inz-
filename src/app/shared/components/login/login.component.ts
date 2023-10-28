import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormService } from 'src/app/shared/services/form.service';
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
    private _authService: AuthService,
    private _loginStorageService: LoginStorageService,
    private _formService: FormService
  ) {}

  ngOnInit() {
    this.checkLocalStorage();
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
        this._formService.showError('Błąd', 'Wystąpił błąd podczas logowania');
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
    this._router.navigate(['zapomnialem_haslo']);
  }

  private _resetForm() {
    this.loginForm.reset();
    this._formService.clearAllErrors(this.loginForm);
    setTimeout(() => {
      this.loadingBall = false;
    }, 1500);
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

    this._authService.signIn(email, password).then((success) => {
      if (success && rememberMe) {
        this._loginStorageService.setLoginStorage(email, password);
      }
    });
  }

  private async checkLocalStorage() {
    const getLoginStorage = this._loginStorageService.getLoginStorage();

    if (getLoginStorage) {
      this.loadingBall = true;
      const loginLocalStorageData = JSON.parse(getLoginStorage);
      const email = loginLocalStorageData.email;
      const password = loginLocalStorageData.password;

      await this._authService.signIn(email, password);
    } else {
      return;
    }
  }
}
