import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-change-email-address',
  templateUrl: './change-email-address.component.html',
  styleUrls: ['./change-email-address.component.scss'],
})
export class ChangeEmailAddressComponent {
  newEmailForm!: FormGroup;
  required = false;
  loadingBall = false;

  constructor(
    private _router: Router,
    private _formService: FormService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  async onSubmit() {
    if (this.newEmailForm.valid) {
      this.loadingBall = true;
      this.required = false;
      try {
        const beforeEmail = this.newEmailForm.value.beforeEmail;
        await this._authService.changeEmail(beforeEmail, '');
        // await this._resetPassword();
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

  private _resetForm() {
    this.newEmailForm.reset();
    this._formService.clearAllErrors(this.newEmailForm);
    setTimeout(() => {
      this.loadingBall = false;
    }, 1500);
  }

  private initForm() {
    let beforeEmail = '';
    let newEmail = '';
    let newEmailRepeat = '';

    this.newEmailForm = new FormGroup({
      beforeEmail: new FormControl(beforeEmail, [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      newEmail: new FormControl(newEmail, [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      newEmailRepeat: new FormControl(newEmailRepeat, [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
    });
  }
}
