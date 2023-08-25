import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  constructor(private _router: Router) {}

  navigateToAboutUs() {
    this._router.navigate(['/o-nas']);
  }

  navigateToContact() {
    this._router.navigate(['/kontakt']);
  }

  navigateToPrivacyPolicy() {
    this._router.navigate(['/polityka-prywatnosci']);
  }
}
