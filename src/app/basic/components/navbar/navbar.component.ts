import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeStorageService } from 'src/app/shared/services/theme-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn = true;
  root = window.document.documentElement;
  themeName: string = '';

  constructor(
    private _themeStorageService: ThemeStorageService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.themeName = this._themeStorageService.loadNavTheme();
  }

  onToggleTheme() {
    this.themeName = this._themeStorageService.toggleNavTheme();
  }

  navigateToLogin() {
    this._router.navigate(['logowanie']);
  }
}
