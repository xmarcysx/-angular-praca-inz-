import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss'],
})
export class TermsComponent {
  constructor(private _router: Router, private _authService: AuthService) {}

  navigateToRegistration() {
    if (this._authService.isLoggedIn) {
      this._router.navigate(['dashboard']);
    } else {
      this._router.navigate(['rejestracja']);
    }
  }
}
