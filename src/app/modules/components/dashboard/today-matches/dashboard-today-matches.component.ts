import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { log } from 'firebase-functions/logger';
import { interval, map } from 'rxjs';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-dashboard-today-matches',
  templateUrl: './dashboard-today-matches.component.html',
  styleUrls: ['./dashboard-today-matches.component.scss'],
})
export class DashboardTodayMatches implements OnInit {
  matches: any[] = [];
  match: any;
  form: any;

  loadingBall: boolean = false;
  ableToStart: boolean = false;
  teamsOptions: any;

  showMatchDialog: boolean = false;

  constructor(
    private _firebaseService: FirebaseService,
    private fb: FormBuilder
  ) {
    this._ableToStartObservable();
  }

  async ngOnInit() {
    this._createForm();
    this._getAllTodaysMatches();
  }

  openMatchDialog(match: any) {
    this.match = match;
    this.teamsOptions = [
      { label: match.homeTeam.name, value: match.homeTeam, home: true },
      { label: match.awayTeam.name, value: match.awayTeam, home: false },
    ];
    this.showMatchDialog = true;
  }

  closeMatchDialog() {
    this.form.reset();

    this.showMatchDialog = false;
  }

  saveGoalScorer() {
    if (this.form.valid) {
      const roundId = this.match.roundId;
      const matchId = this.match.matchId;
      const isHome = this.form.value.choosenTeam.home;

      const data = {
        time: this.form.value.choosenMinute,
        scorer: this.form.value.choosenScorer,
      };

      this._firebaseService
        .goalScored(roundId, matchId, isHome, data)
        .subscribe(() => {
          this._getAllTodaysMatches();
        });

      this.showMatchDialog = false;
      this.form.reset();
    }
  }

  startMatch(match: any) {
    this._firebaseService
      .changeStatus(match.roundId, match.matchId, 'started')
      .subscribe(() => {
        this._getAllTodaysMatches();
      });
  }

  finishMatch(match: any) {
    this.form.reset();
    this.showMatchDialog = false;
    this.ableToStart = false;

    this._firebaseService
      .changeStatus(match.roundId, match.matchId, 'finished')
      .subscribe(() => {
        this._firebaseService.addPointsAfterFinishedMatch(
          match.homeTeamGoals?.length ?? 0,
          match.awayTeamGoals?.length ?? 0,
          match.homeTeam.id,
          match.awayTeam.id
        );
        this._getAllTodaysMatches();
      });
  }

  private _getAllTodaysMatches() {
    this.loadingBall = true;
    this._firebaseService.getAllTodaysMatches().subscribe((res) => {
      this.matches = res;
      this.loadingBall = false;
    });
  }

  private _ableToStartObservable() {
    const timeObservable = interval(1000).pipe(map(() => new Date()));

    timeObservable.subscribe((now) => {
      if (
        now.getHours() >= 19 &&
        now.getMinutes() >= 0 &&
        now.getSeconds() >= 0 &&
        !this.ableToStart
      ) {
        this.ableToStart = true;
        this._getAllTodaysMatches();
      }
    });
  }

  private _createForm() {
    this.form = this.fb.group({
      choosenTeam: [null, Validators.required],
      choosenMinute: [
        null,
        [Validators.required, Validators.min(0), Validators.max(90)],
      ],
      choosenScorer: [null, Validators.required],
    });
  }
}
