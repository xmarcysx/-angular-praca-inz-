import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  constructor(private _router: Router, private _authService: AuthService) {}

  navigateToDashboard() {
    if (this._authService.isLoggedIn) {
      this._router.navigate(['dashboard']);
    } else {
      this._router.navigate(['']);
    }
  }
}
