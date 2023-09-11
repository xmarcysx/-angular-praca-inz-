import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  hidePassword: boolean = true;
  newPasswordForm!: FormGroup;
  required = false;
  loadingBall = false;

  constructor(
    private _router: Router,
    private _formService: FormService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this._initForm();
  }

  async onSubmit() {
    if (this.newPasswordForm.valid) {
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

  navigateToSettings() {
    this._router.navigate(['ustawienia']);
  }

  private async _resetPassword() {
    const passwordCheck = this._passwordsMatchCheck();
    if (passwordCheck) {
      const newPassword = this.newPasswordForm.value.newPassword;
      const beforePassword = this.newPasswordForm.value.beforePassword;
      await this._authService.changePassword(newPassword);
    } else {
      return;
    }
  }

  private _passwordsMatchCheck(): boolean {
    if (
      this.newPasswordForm.value.newPassword !==
      this.newPasswordForm.value.newPasswordRepeat
    ) {
      this._formService.showError('Błąd', 'Podane hasła różnią się');
      return false;
    } else {
      return true;
    }
  }

  private _resetForm() {
    this.newPasswordForm.reset();
    this._formService.clearAllErrors(this.newPasswordForm);
    setTimeout(() => {
      this.loadingBall = false;
    }, 1500);
  }

  private _initForm() {
    const passwordValidators = [
      Validators.required,
      Validators.pattern('^.{8,}$'),
    ];

    this.newPasswordForm = new FormGroup({
      newPassword: new FormControl('', passwordValidators),
      newPasswordRepeat: new FormControl('', passwordValidators),
    });
  }
}
