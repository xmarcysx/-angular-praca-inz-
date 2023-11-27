import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { log } from 'firebase-functions/logger';
import { interval, map } from 'rxjs';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-single-match',
  templateUrl: './single-match.component.html',
})
export class SingleMatchComponenet implements OnInit {
  @Input() match: any;
  @Output() matchStarted = new EventEmitter();
  @Output() matchDialogOpened = new EventEmitter();

  ableToStart: boolean = false;

  constructor() {}

  ngOnInit() {
    this._ableToStartObservable();
  }

  openMatchDialog(match: any) {
    this.matchDialogOpened.emit(match);
  }

  startMatch(match: any) {
    this.matchStarted.emit(match);
  }

  private _ableToStartObservable() {
    // const date = new Date();

    // const day = String(date.getDate()).padStart(2, '0');
    // const month = String(date.getMonth() + 1).padStart(2, '0');
    // const year = date.getFullYear();
    // const formattedDate = `${day}.${month}.${year}`;

    // const hour = date.getHours();
    // const minute = date.getMinutes();
    // const formattedTime = `${hour}:${minute}`;

    // console.log(formattedDate, formattedTime);
    // if (
    //   this.match.date === formattedDate &&
    //   this.match.startMatch === formattedTime &&
    //   this.match.status === 'waiting'
    // ) {
    //   this.ableToStart = true;
    // }

    const dateObservable = interval(1000).pipe(map(() => new Date()));

    dateObservable.subscribe((date) => {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const formattedDate = `${day}.${month}.${year}`;

      const hour = date.getHours();
      const minute = date.getMinutes();
      const formattedTime = `${hour}:${minute}`;

      if (
        this.match.date === formattedDate &&
        this.match.startTime === formattedTime &&
        this.match.status === 'waiting'
      ) {
        this.ableToStart = true;
      }
    });
  }
}
