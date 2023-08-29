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
      if (this._emailsMatchCheck()) {
        this.loadingBall = true;
        this.required = false;
        try {
          const beforeEmail = this.newEmailForm.value.beforeEmail;
          const newEmail = this.newEmailForm.value.newEmail;
          await this._changeEmail(beforeEmail, newEmail);
        } catch (error) {
          this.loadingBall = false;
          this._formService.showError('Błąd', 'Wystąpił błąd');
        }
        this._resetForm();
      } else {
        this.required = false;
        return;
      }
    } else {
      this.required = true;
      return;
    }
  }

  navigateToSettings() {
    this._router.navigate(['ustawienia']);
  }

  private async _changeEmail(beforeEmail: string, newEmail: string) {
    this._authService.changeEmail(beforeEmail, newEmail);
  }

  private _emailsMatchCheck(): boolean {
    if (
      this.newEmailForm.value.newEmail !==
      this.newEmailForm.value.newEmailRepeat
    ) {
      this._formService.showError('Błąd', 'Podane adresy e-mail różnią się');
      this._resetForm();
      return false;
    } else {
      return true;
    }
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
