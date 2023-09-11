import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-change-profile-logo',
  templateUrl: './change-profile-logo.component.html',
  styleUrls: ['./change-profile-logo.component.scss'],
})
export class ChangeProfileLogoComponent {
  imageForm!: FormGroup;
  required = false;
  loadingBall = false;

  constructor(
    private _router: Router,
    private _formService: FormService,
    private _authService: AuthService,
    private _firebaseService: FirebaseService,
    private _angularFireAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this._initForm();
  }

  async onSubmit() {
    if (this.imageForm.valid) {
      this.loadingBall = true;
      this.required = false;
      try {
        const newImage = this.imageForm.value.newImage;
        await this._changeImage(newImage);
      } catch (error) {
        this.loadingBall = false;
        this._formService.showError('Błąd', 'Wystąpił błąd');
      }
      this._resetForm();
    } else {
      this.required = true;
      return;
    }
  }

  private _resetForm() {
    this.imageForm.reset();
    this._formService.clearAllErrors(this.imageForm);
    setTimeout(() => {
      this.loadingBall = false;
    }, 1500);
  }

  private _initForm() {
    this.imageForm = new FormGroup({
      newImage: new FormControl('', Validators.required),
    });
  }

  private async _changeImage(newImage: string) {
    this._angularFireAuth.currentUser.then((user) => {
      const imageExtension = newImage.toLocaleLowerCase().split('.').pop();
      if (imageExtension === 'png' || imageExtension === 'jpg') {
        const email = user?.email;
        if (!email) {
          this._formService.showError('Błąd', 'Użytkownik nie istnieje');
          return;
        }
        this._firebaseService.updateProfileLogo(email, newImage);
      } else {
        this._formService.showError(
          'Błąd',
          'Podana ścieżka jest nieprawidłowa'
        );
        return;
      }
    });
  }

  navigateToSettings() {
    this._router.navigate(['ustawienia']);
  }
}
