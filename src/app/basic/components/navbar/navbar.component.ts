import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { ThemeStorageService } from 'src/app/shared/services/theme-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  root = window.document.documentElement;
  themeName: string = '';
  isHidden: boolean = true;
  email: string = '';
  userData: any;

  constructor(
    private _themeStorageService: ThemeStorageService,
    private _router: Router,
    private _authSerivce: AuthService,
    private _firebaseService: FirebaseService
  ) {}

  logo = '../../../../assets/images/userProfile.png';

  async ngOnInit() {
    this.isLoggedIn = this._authSerivce.isLoggedIn;
    this.email = this._authSerivce.email;
    this._getUserData(this.email);

    this.themeName = this._themeStorageService.loadNavTheme();
  }

  openSettings() {
    this.isHidden = !this.isHidden;
  }

  onToggleTheme() {
    this.themeName = this._themeStorageService.toggleNavTheme();
  }

  navigateToLogin() {
    this._router.navigate(['logowanie']);
  }

  navigateToSettings() {
    this._router.navigate(['ustawienia']);
  }

  logout() {
    this._authSerivce.signOut();
  }

  private _getUserData(email: string) {
    this._firebaseService.getUserDataByEmail(email).subscribe((data) => {
      this.userData = data;
    });
  }
}
