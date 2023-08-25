import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
})
export class PrivacyPolicyComponent {
  constructor(private _router: Router, private _authService: AuthService) {}

  navigateToDashboard() {
    if (this._authService.isLoggedIn) {
      this._router.navigate(['dashboard']);
    } else {
      this._router.navigate(['']);
    }
  }
}
