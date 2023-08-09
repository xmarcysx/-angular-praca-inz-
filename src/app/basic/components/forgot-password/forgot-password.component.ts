import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  forgotPasswordForm!: FormGroup;
  required = false;

  constructor() {}

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      this.required = false;
      console.log(this.forgotPasswordForm.value);
    } else {
      this.required = true;
    }
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
}
