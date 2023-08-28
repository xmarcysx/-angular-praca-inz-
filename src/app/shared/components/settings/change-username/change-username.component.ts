import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-username',
  templateUrl: './change-username.component.html',
  styleUrls: ['./change-username.component.scss'],
})
export class ChangeUsernameComponent {
  constructor(private _router: Router) {}

  navigateToSettings() {
    this._router.navigate(['ustawienia']);
  }
}
