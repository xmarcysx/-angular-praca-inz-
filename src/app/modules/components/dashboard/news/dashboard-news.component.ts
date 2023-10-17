import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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

  constructor(
    private _firebaseService: FirebaseService,
    private cdRef: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    this.getAllMessages();
  }

  getAllMessages() {
    forkJoin([
      this._firebaseService.getAllMessages(),
      this._firebaseService.getAllUsers(),
    ]).subscribe(([messagesResponse, userDataResponse]) => {
      const messages = Object.values(messagesResponse);
      const userData = userDataResponse;

      this.messages = messages.map((message: any) => {
        const user = userData.find(
          (user: { email: any }) => user.email === message.userEmail
        );
        return {
          ...message,
          user: user,
        };
      });

      this.totalRecords = this.messages.length;
      this.onPageChange({ first: 0, rows: 5 });
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
