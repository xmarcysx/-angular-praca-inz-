import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { ThemeStorageService } from './shared/services/theme-storage.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(
    private themeStorageService: ThemeStorageService,
    private _http: HttpClient
  ) {}

  ngOnInit(): void {
    initFlowbite();
    this.themeStorageService.loadTheme();

    // this._http
    //   .put(`${environment.firebaseConfig.databaseURL}/teams.json`, [
    //     {
    //       id: 0,
    //       name: 'Brzezina Osiek',
    //       img: 'https://i.imgur.com/9UCR8Fa.png',
    //       points: 0,
    //     },
    //     {
    //       id: 1,
    //       name: 'Górnik Brzeszcze',
    //       img: 'https://i.imgur.com/hfftbLg.png',
    //       points: 0,
    //     },
    //     {
    //       id: 2,
    //       name: 'Hejnał Kęty',
    //       img: 'https://i.imgur.com/CZV3fNv.png',
    //       points: 0,
    //     },
    //     {
    //       id: 3,
    //       name: 'Iskra Brzinka',
    //       img: 'https://i.imgur.com/2all7qO.png',
    //       points: 0,
    //     },
    //     {
    //       id: 4,
    //       name: 'Korona Harmęże',
    //       img: 'https://i.imgur.com/LXNOT9Y.png',
    //       points: 0,
    //     },
    //     {
    //       id: 5,
    //       name: 'LKS Jawiszowice',
    //       img: 'https://i.imgur.com/pS4vdFs.png',
    //       points: 0,
    //     },
    //     {
    //       id: 6,
    //       name: 'LKS Rajsko',
    //       img: 'https://i.imgur.com/Md7afdO.png',
    //       points: 0,
    //     },
    //     {
    //       id: 7,
    //       name: 'Strumień Polanka Wielka',
    //       img: 'https://i.imgur.com/1g4GcSu.png',
    //       points: 0,
    //     },
    //     {
    //       id: 8,
    //       name: 'Poręba Wielka',
    //       img: 'https://i.imgur.com/t8ppKvh.png',
    //       points: 0,
    //     },
    //     {
    //       id: 10,
    //       name: 'Unia Oświęcim',
    //       img: 'https://i.imgur.com/x68blq6.png',
    //       points: 0,
    //     },
    //   ])
    //   .subscribe();
  }
}
