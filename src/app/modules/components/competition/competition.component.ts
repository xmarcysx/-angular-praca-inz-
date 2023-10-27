import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
})
export class CompetitionComponent implements OnInit {
  results: any[] = [];

  constructor(
    private _firebaseService: FirebaseService,
    private cdRef: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    this._getAllTeamsTable();
  }

  private _getAllTeamsTable() {
    this._firebaseService
      .getAllTeamsForCompetition()
      .pipe(
        map((teams) => {
          return teams.sort((a, b) => b.points - a.points);
        })
      )
      .subscribe((sortedTeams) => {
        this.results = sortedTeams;
      });
  }

  getTeamClass(index: number): string {
    if (index === 0) {
      return 'bg-green-500';
    } else if (index >= this.results.length - 2) {
      return 'bg-red-500';
    } else {
      return 'bg-white dark:bg-black';
    }
  }
}
