import { ListKeyManager } from '@angular/cdk/a11y';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
} from '@angular/core';
import { log } from 'firebase-functions/logger';
import { MessageService } from 'primeng/api';
import { forkJoin, map } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  text: string | undefined;

  messages: any[] = [];
  results: any[] = [];
  message!: any;
  visible: boolean = false;
  rowsPerPageOptions = [10, 20, 50];
  totalRecords!: number;

  constructor(
    private el: ElementRef,
    private _authService: AuthService,
    private _firebaseService: FirebaseService,
    private _messageService: MessageService,
    private cdRef: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    this.getAllMessages();
  }

  addNews() {
    this.visible = true;
  }

  saveTheMessage() {
    const email = this._authService.email;
    this._firebaseService.addMessageToDatabase(email, this.message);
    this.message = '';
    this.visible = false;
    this._messageService.add({
      severity: 'success',
      summary: 'Dodano wiadomość',
      detail: 'Wiadomość została dodana',
    });
    setTimeout(() => {
      this.getAllMessages();
    }, 500);
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

      this.messages.reverse();

      this.totalRecords = this.messages.length;
      this.onPageChange({ first: 0, rows: 10 });
    });
  }

  onPageChange(event: any) {
    this.totalRecords = this.messages.length;
    this.results = this.messages.slice(event.first, event.first + event.rows);
    this.cdRef.detectChanges();

    document.querySelector('#scroll-top')?.scrollIntoView();
  }
}
