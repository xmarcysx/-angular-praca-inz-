import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { forkJoin } from 'rxjs';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-dashboard-news',
  templateUrl: './dashboard-news.component.html',
  styleUrls: ['./dashboard-news.component.scss'],
})
export class DashboardNews implements OnInit {
  text: string | undefined;

  messages: any[] = [];
  results: any[] = [];
  message!: any;
  totalRecords!: number;
  loadingBall: boolean = false;

  constructor(
    private _firestore: AngularFireDatabase,
    private _firebaseService: FirebaseService,
    private cdRef: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    this._firestore
      .list('messages')
      .valueChanges()
      .subscribe(() => {
        this.getAllMessages();
      });
  }

  getAllMessages() {
    this.loadingBall = true;
    forkJoin([
      this._firebaseService.getAllMessages(),
      this._firebaseService.getAllUsers(),
    ]).subscribe(([messagesResponse, userDataResponse]) => {
      const messages = Object.values(messagesResponse);
      const userData = userDataResponse;

      this.messages = messages.map((message: any) => {
        const user = userData.find(
          (user: { uid: any }) => user.uid === message.userUID
        );
        return {
          ...message,
          user: user,
        };
      });

      this.totalRecords = this.messages.length;
      this.onPageChange({ first: 0, rows: 5 });
      this.loadingBall = false;
    });
  }

  onPageChange(event: any) {
    this.totalRecords = this.messages.length;
    this.results = this.messages
      .reverse()
      .slice(event.first, event.first + event.rows);

    this.cdRef.detectChanges();
  }
}
