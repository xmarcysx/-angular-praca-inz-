import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
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

  constructor(
    private _themeStorageService: ThemeStorageService,
    private _router: Router,
    private _authSerivce: AuthService
  ) {}

  async ngOnInit() {
    this.isLoggedIn = this._authSerivce.isLoggedIn;
    this.email = this._authSerivce.email;

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
}
