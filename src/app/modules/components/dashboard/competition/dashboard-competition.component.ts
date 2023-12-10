import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { map, take } from 'rxjs';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-dashboard-competition',
  templateUrl: './dashboard-competition.component.html',
})
export class DashboardCompetitionComponent implements OnInit {
  results: any[] = [];
  loadingBall: boolean = false;

  constructor(
    private _firebaseService: FirebaseService,
    private cdRef: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    this._getAllTeamsTable();
  }

  private _getAllTeamsTable() {
    this.loadingBall = true;
    this._firebaseService
      .getAllTeamsForCompetition()
      .pipe(
        map((teams) => {
          return teams.sort((a, b) => b.points - a.points).slice(0, 5);
        }),
        take(1)
      )
      .subscribe((sortedTeams) => {
        this.results = sortedTeams;
        this.loadingBall = false;
      });
  }

  getTeamClass(index: number): string {
    if (index === 0) {
      return 'bg-green-500';
    } else {
      return 'bg-white dark:bg-black';
    }
  }
}
