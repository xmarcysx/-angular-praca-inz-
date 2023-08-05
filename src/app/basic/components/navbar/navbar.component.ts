import { Component, OnInit } from '@angular/core';
import { Theme } from 'src/app/shared/enums/theme.enum';
import { ThemeStorageService } from 'src/app/shared/services/theme-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  root = window.document.documentElement;
  themeName: string = '';

  constructor(private themeStorageService: ThemeStorageService) {}

  ngOnInit() {
    this.themeName = this.themeStorageService.loadNavTheme();
  }

  onToggleTheme() {
    this.themeName = this.themeStorageService.toggleNavTheme();
  }
}
