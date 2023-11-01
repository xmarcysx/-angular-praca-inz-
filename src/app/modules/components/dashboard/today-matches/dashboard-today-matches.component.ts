import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-dashboard-today-matches',
  templateUrl: './dashboard-today-matches.component.html',
})
export class DashboardTodayMatches implements OnInit {
  matches: any[] = [];

  constructor(private _firebaseService: FirebaseService) {}

  async ngOnInit() {
    this._getAllTodaysMatches();
  }

  private _getAllTodaysMatches() {
    this._firebaseService.getAllTodaysMatches().subscribe((res) => {
      this.matches = res;
    });
  }
}
