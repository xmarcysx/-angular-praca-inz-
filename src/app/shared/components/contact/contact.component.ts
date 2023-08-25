import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  constructor(private _router: Router, private _authService: AuthService) {}

  navigateToDashboard() {
    if (this._authService.isLoggedIn) {
      this._router.navigate(['dashboard']);
    } else {
      this._router.navigate(['']);
    }
  }
}
