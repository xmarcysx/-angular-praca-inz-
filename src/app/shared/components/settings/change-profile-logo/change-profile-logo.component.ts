import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-profile-logo',
  templateUrl: './change-profile-logo.component.html',
  styleUrls: ['./change-profile-logo.component.scss'],
})
export class ChangeProfileLogoComponent {
  loadingBall = false;
  fileName = '';

  constructor(private _router: Router) {}

  navigateToSettings() {
    this._router.navigate(['ustawienia']);
  }
}
