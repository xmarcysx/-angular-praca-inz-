import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject, interval, map, takeUntil } from 'rxjs';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-single-match',
  templateUrl: './single-match.component.html',
})
export class SingleMatchComponenet implements OnInit, OnDestroy {
  @Input() match: any;
  @Output() matchStarted = new EventEmitter();
  @Output() matchDialogOpened = new EventEmitter();

  ableToStart: boolean = false;

  private destroy$ = new Subject<void>();

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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private _ableToStartObservable() {
    const dateObservable = interval(1000).pipe(
      map(() => new Date()),
      takeUntil(this.destroy$)
    );

    const dateComponents = this.match.date.split('.').map(Number);
    const timeComponents = this.match.startTime.split(':').map(Number);
    const matchDateTime = new Date(
      dateComponents[2],
      dateComponents[1] - 1,
      dateComponents[0],
      timeComponents[0],
      timeComponents[1]
    );

    const fifteenMinutesLater = new Date(
      matchDateTime.getTime() + 15 * 60 * 1000
    );

    dateObservable.subscribe((date) => {
      if (
        date.getTime() >= matchDateTime.getTime() &&
        date.getTime() <= fifteenMinutesLater.getTime() &&
        this.match.status === 'waiting'
      ) {
        this.ableToStart = true;
      } else {
        this.ableToStart = false;
      }
    });
  }
}
