import { ListKeyManager } from '@angular/cdk/a11y';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { map } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  messages: any[] = [];
  results: any[] = [];
  message!: any;
  visible: boolean = false;
  rowsPerPageOptions = [10, 20, 50];
  totalRecords!: number;

  constructor(
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
    this._firebaseService.getAllMessages().subscribe((res) => {
      if (res) {
        this.messages = Object.values(res);
        this.totalRecords = this.messages.length;

        this.onPageChange({ first: 0, rows: 10 });
        this.cdRef.detectChanges();
      }
    });
  }

  onPageChange(event: any) {
    this.totalRecords = this.messages.length;
    this.results = this.messages.slice(event.first, event.first + event.rows);

    this.cdRef.detectChanges();
  }
}
