import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  registrationForm!: FormGroup;
  required = false;

  constructor() {}

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.required = false;
      console.log(this.registrationForm.value);
    } else {
      this.required = true;
    }
  }

  private initForm() {
    let emailRegistration = '';
    let usernameRegistration = '';
    let passwordRegistration = '';
    let passwordRepeatRegistration = '';
    let termsRegistration = false;

    this.registrationForm = new FormGroup({
      email: new FormControl(emailRegistration, [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      username: new FormControl(usernameRegistration, Validators.required),
      password: new FormControl(passwordRegistration, [
        Validators.required,
        Validators.pattern('^.{8,}$'),
      ]),
      passwordRepeat: new FormControl(passwordRepeatRegistration, [
        Validators.required,
        Validators.pattern('^.{8,}$'),
      ]),
      terms: new FormControl(termsRegistration, Validators.required),
    });
  }
}
