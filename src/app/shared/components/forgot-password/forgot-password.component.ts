import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  forgotPasswordForm!: FormGroup;
  required = false;
  loadingBall = false;

  constructor(
    private _router: Router,
    private _formService: FormService,
    private _firebaseService: FirebaseService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  async onSubmit() {
    if (this.forgotPasswordForm.valid) {
      this.loadingBall = true;
      this.required = false;
      try {
        await this._resetPassword();
      } catch (error) {
        this.loadingBall = false;
        this._formService.showError('Błąd', 'Wystąpił błąd');
      }
      this._resetForm();
    } else {
      this.required = true;
    }
  }

  navigateToLogin() {
    this._router.navigate(['logowanie']);
  }

  private _resetForm() {
    this.forgotPasswordForm.reset();
    this._formService.clearAllErrors(this.forgotPasswordForm);
    setTimeout(() => {
      this.loadingBall = false;
    }, 1500);
  }

  private initForm() {
    let emailForgotPasswordForm = '';

    this.forgotPasswordForm = new FormGroup({
      email: new FormControl(emailForgotPasswordForm, [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
    });
  }

  private async _resetPassword() {
    const emailForgotPasswordForm = this.forgotPasswordForm.value.email;

    if (emailForgotPasswordForm) {
      this._authService.resetPassword(emailForgotPasswordForm);
    } else {
      return;
    }
  }
}
