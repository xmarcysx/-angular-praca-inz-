import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  visible: boolean = false;
  match: any;
  rounds!: any[];
  matches!: any[];

  constructor(private _firebaseService: FirebaseService) {}

  ngOnInit() {
    this._getAllLeagueRounds();
  }

  choosenRound(round: any) {
    this.matches = Object.values(round.value);
    this.matches.pop();
  }

  showMatchDetails(match: any) {
    this.match = match;
    this.visible = true;
  }

  closeMatchDetails() {
    this.match = null;
    this.visible = false;
  }

  private _getAllLeagueRounds() {
    this._firebaseService
      .getAllLeagueRounds()
      .pipe(
        map((rounds) => {
          return rounds.map((round: any, index: any) => ({
            ...round,
            round: `Kolejka ${index + 1}`,
          }));
        })
      )
      .subscribe((res) => {
        this.rounds = res;
      });
  }
}
