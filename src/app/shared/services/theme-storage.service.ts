import { Injectable } from '@angular/core';
import { Theme } from '../enums/theme.enum';

@Injectable({
  providedIn: 'root',
})
export class ThemeStorageService {
  themeName: string = '';
  root = window.document.documentElement;

  constructor() {}

  setThemeStorage(value: string) {
    localStorage.setItem('GUI_color_theme', value);
  }

  getThemeStorage() {
    return localStorage.getItem('GUI_color_theme');
  }

  loadTheme() {
    const currentTheme = this.getThemeStorage();

    if (currentTheme === Theme.DARKMODE) {
      this.root.classList.add('dark');
    } else {
      this.root.classList.remove('dark');
    }
  }

  loadNavTheme(): string {
    const currentTheme = this.getThemeStorage();

    if (currentTheme === Theme.DARKMODE) {
      this.root.classList.add('dark');
      return (this.themeName = Theme.DARKMODE);
    } else {
      this.root.classList.remove('dark');
      return (this.themeName = Theme.LIGHTMODE);
    }
  }

  toggleNavTheme(): string {
    const currentTheme = this.getThemeStorage();

    if (currentTheme === Theme.DARKMODE) {
      this.root.classList.remove('dark');
      this.setThemeStorage(Theme.LIGHTMODE);
      return (this.themeName = Theme.LIGHTMODE);
    } else {
      this.root.classList.add('dark');
      this.setThemeStorage(Theme.DARKMODE);
      return (this.themeName = Theme.DARKMODE);
    }
  }
}
