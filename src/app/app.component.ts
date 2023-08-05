import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { ThemeStorageService } from './shared/services/theme-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private themeStorageService: ThemeStorageService) {}

  ngOnInit(): void {
    initFlowbite();
    this.themeStorageService.loadTheme();
  }
}
