import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-change-username',
  templateUrl: './change-username.component.html',
  styleUrls: ['./change-username.component.scss'],
})
export class ChangeUsernameComponent {
  newUsernameForm!: FormGroup;
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
    if (this.newUsernameForm.valid) {
      this.loadingBall = true;
      this.required = false;
      try {
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
    this.newUsernameForm.reset();
    this._formService.clearAllErrors(this.newUsernameForm);
    setTimeout(() => {
      this.loadingBall = false;
    }, 1500);
  }

  private _initForm() {
    this.newUsernameForm = new FormGroup({
      newUsername: new FormControl('', Validators.required),
    });
  }
}
