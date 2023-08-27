import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  hidePassword: boolean = true;
  registrationForm!: FormGroup;
  required = false;
  loadingBall = false;

  constructor(
    private _router: Router,
    private _formService: FormService,
    private _authService: AuthService,
    private _firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    this._initForm();
  }

  async onSubmit() {
    if (this.registrationForm.valid) {
      if (this._passwordsMatchCheck()) {
        this.loadingBall = true;
        this.required = false;
        try {
          await this._registerUser();
        } catch (error) {
          this.loadingBall = false;
          this._formService.showError(
            'Błąd',
            'Wystąpił błąd podczas rejestracji'
          );
        }
        this._formService.showSuccess(
          'Sukces',
          'Użytkownik został zarejestrowany'
        );
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

  navigateToLogin() {
    this._router.navigate(['logowanie']);
  }

  navigateToTerms() {
    this._router.navigate(['regulamin']);
  }

  private _passwordsMatchCheck(): boolean {
    if (
      this.registrationForm.value.password !==
      this.registrationForm.value.passwordRepeat
    ) {
      this._formService.showError('Błąd', 'Podane hasła różnią się');
      return false;
    } else {
      return true;
    }
  }

  private _initForm() {
    const emailValidators = [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ];
    const passwordValidators = [
      Validators.required,
      Validators.pattern('^.{8,}$'),
    ];

    this.registrationForm = new FormGroup({
      email: new FormControl('', emailValidators),
      username: new FormControl('', Validators.required),
      password: new FormControl('', passwordValidators),
      passwordRepeat: new FormControl('', passwordValidators),
      terms: new FormControl(false, Validators.required),
    });
  }

  private _resetForm() {
    this.registrationForm.reset();
    this._formService.clearAllErrors(this.registrationForm);
    setTimeout(() => {
      this.loadingBall = false;
    }, 1500);
  }

  private async _registerUser() {
    const email = this.registrationForm.value.email;
    const password = this.registrationForm.value.password;
    const username = this.registrationForm.value.username;

    this._authService.signUp(email, password);
    this._firebaseService.addUserToDatabase(username, email);
  }
}
