import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-starting-page',
  templateUrl: './starting-page.component.html',
  styleUrls: ['./starting-page.component.scss'],
})
export class StartingPageComponent {
  constructor(private _router: Router) {}

  navigateToLogin() {
    this._router.navigate(['logowanie']);
  }
}
