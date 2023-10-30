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
    // - TEAMS
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

    // MATCHES
    // this._http
    //   .put(`${environment.firebaseConfig.databaseURL}/matches.json`, [
    //     [
    //       {
    //         homeTeamId: 0,
    //         awayTeamId: 9,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 1,
    //         awayTeamId: 8,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 2,
    //         awayTeamId: 7,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 3,
    //         awayTeamId: 6,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 4,
    //         awayTeamId: 5,
    //         date: '01.01.2024',
    //       },
    //     ],
    //     [
    //       {
    //         homeTeamId: 5,
    //         awayTeamId: 9,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 6,
    //         awayTeamId: 4,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 7,
    //         awayTeamId: 3,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 8,
    //         awayTeamId: 2,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 0,
    //         awayTeamId: 1,
    //         date: '01.01.2024',
    //       },
    //     ],
    //     [
    //       {
    //         homeTeamId: 1,
    //         awayTeamId: 9,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 2,
    //         awayTeamId: 0,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 3,
    //         awayTeamId: 8,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 4,
    //         awayTeamId: 7,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 5,
    //         awayTeamId: 6,
    //         date: '01.01.2024',
    //       },
    //     ],
    //     [
    //       {
    //         homeTeamId: 6,
    //         awayTeamId: 9,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 7,
    //         awayTeamId: 5,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 8,
    //         awayTeamId: 4,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 0,
    //         awayTeamId: 3,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 1,
    //         awayTeamId: 2,
    //         date: '01.01.2024',
    //       },
    //     ],
    //     [
    //       {
    //         homeTeamId: 2,
    //         awayTeamId: 9,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 3,
    //         awayTeamId: 1,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 4,
    //         awayTeamId: 0,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 5,
    //         awayTeamId: 8,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 6,
    //         awayTeamId: 7,
    //         date: '01.01.2024',
    //       },
    //     ],
    //     [
    //       {
    //         homeTeamId: 7,
    //         awayTeamId: 9,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 8,
    //         awayTeamId: 6,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 0,
    //         awayTeamId: 5,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 1,
    //         awayTeamId: 4,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 2,
    //         awayTeamId: 3,
    //         date: '01.01.2024',
    //       },
    //     ],
    //     [
    //       {
    //         homeTeamId: 3,
    //         awayTeamId: 9,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 4,
    //         awayTeamId: 2,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 5,
    //         awayTeamId: 1,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 6,
    //         awayTeamId: 0,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 7,
    //         awayTeamId: 8,
    //         date: '01.01.2024',
    //       },
    //     ],
    //     [
    //       {
    //         homeTeamId: 8,
    //         awayTeamId: 9,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 0,
    //         awayTeamId: 7,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 1,
    //         awayTeamId: 6,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 2,
    //         awayTeamId: 5,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 3,
    //         awayTeamId: 4,
    //         date: '01.01.2024',
    //       },
    //     ],
    //     [
    //       {
    //         homeTeamId: 4,
    //         awayTeamId: 9,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 5,
    //         awayTeamId: 3,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 6,
    //         awayTeamId: 2,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 7,
    //         awayTeamId: 1,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 8,
    //         awayTeamId: 0,
    //         date: '01.01.2024',
    //       },
    //     ],
    //     [
    //       {
    //         homeTeamId: 9,
    //         awayTeamId: 0,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 8,
    //         awayTeamId: 1,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 7,
    //         awayTeamId: 2,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 6,
    //         awayTeamId: 3,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 5,
    //         awayTeamId: 4,
    //         date: '01.01.2024',
    //       },
    //     ],
    //     [
    //       {
    //         homeTeamId: 9,
    //         awayTeamId: 5,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 4,
    //         awayTeamId: 6,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 3,
    //         awayTeamId: 7,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 2,
    //         awayTeamId: 8,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 1,
    //         awayTeamId: 0,
    //         date: '01.01.2024',
    //       },
    //     ],
    //     [
    //       {
    //         homeTeamId: 9,
    //         awayTeamId: 1,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 0,
    //         awayTeamId: 2,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 8,
    //         awayTeamId: 3,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 7,
    //         awayTeamId: 4,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 6,
    //         awayTeamId: 5,
    //         date: '01.01.2024',
    //       },
    //     ],
    //     [
    //       {
    //         homeTeamId: 9,
    //         awayTeamId: 6,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 5,
    //         awayTeamId: 7,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 4,
    //         awayTeamId: 8,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 3,
    //         awayTeamId: 0,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 2,
    //         awayTeamId: 1,
    //         date: '01.01.2024',
    //       },
    //     ],
    //     [
    //       {
    //         homeTeamId: 9,
    //         awayTeamId: 2,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 1,
    //         awayTeamId: 3,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 0,
    //         awayTeamId: 4,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 8,
    //         awayTeamId: 5,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 7,
    //         awayTeamId: 6,
    //         date: '01.01.2024',
    //       },
    //     ],
    //     [
    //       {
    //         homeTeamId: 9,
    //         awayTeamId: 7,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 6,
    //         awayTeamId: 8,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 5,
    //         awayTeamId: 0,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 4,
    //         awayTeamId: 1,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 3,
    //         awayTeamId: 2,
    //         date: '01.01.2024',
    //       },
    //     ],
    //     [
    //       {
    //         homeTeamId: 9,
    //         awayTeamId: 3,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 2,
    //         awayTeamId: 4,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 1,
    //         awayTeamId: 5,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 0,
    //         awayTeamId: 6,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 8,
    //         awayTeamId: 7,
    //         date: '01.01.2024',
    //       },
    //     ],
    //     [
    //       {
    //         homeTeamId: 9,
    //         awayTeamId: 8,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 7,
    //         awayTeamId: 0,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 6,
    //         awayTeamId: 1,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 5,
    //         awayTeamId: 2,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 4,
    //         awayTeamId: 3,
    //         date: '01.01.2024',
    //       },
    //     ],
    //     [
    //       {
    //         homeTeamId: 9,
    //         awayTeamId: 4,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 3,
    //         awayTeamId: 5,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 2,
    //         awayTeamId: 6,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 1,
    //         awayTeamId: 7,
    //         date: '01.01.2024',
    //       },
    //       {
    //         homeTeamId: 0,
    //         awayTeamId: 8,
    //         date: '01.01.2024',
    //       },
    //     ],
    //   ])
    //   .subscribe();
  }
}
