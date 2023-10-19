import { ChangeDetectorRef, Component } from '@angular/core';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DisableEnableUserService } from 'src/app/shared/services/disable-enable-user.service';
import { log } from 'firebase-functions/logger';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.components.html',
  styleUrls: ['./manage-users.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class ManageUsersComponent {
  loader: boolean = false;
  users: any[] = [];
  rowsPerPageOptions = [10, 20, 50];
  totalRecords!: number;
  results: any[] = [];

  constructor(
    private cdRef: ChangeDetectorRef,
    private _disableEnableUserService: DisableEnableUserService,
    private _firebaseService: FirebaseService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  async ngOnInit() {
    this.getAllUsersList();
  }

  getAllUsersList() {
    this._firebaseService.getAllUsersAdmin().subscribe((res) => {
      this.users = res;
      this.totalRecords = this.users.length;
      this.onPageChange({ first: 0, rows: 10 });
    });
  }

  onPageChange(event: any) {
    this.totalRecords = this.users.length;
    this.results = this.users.slice(event.first, event.first + event.rows);
    this.cdRef.detectChanges();
  }

  showBlockUnblockModal(user: any) {
    if (user.disabled) {
      this._unlockUser(user);
    } else {
      this._blockUser(user);
    }
  }

  private _unlockUser(user: any) {
    this.confirmationService.confirm({
      message: `Czy na pewno chcesz odblokować użytkownika ${user.username}?`,
      header: 'Odblokuj użytkownika',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'TAK',
      rejectLabel: 'NIE',
      acceptButtonStyleClass: 'bg-green-600 border-none',
      rejectButtonStyleClass: 'bg-red-600 border-none',
      accept: async () => {
        this.loader = true;
        this._disableEnableUserService
          .enableUser(user.uid)
          .subscribe(async (response: any) => {
            if (response.status) {
              this.messageService.add({
                severity: 'success',
                summary: 'Odblokowano',
                detail: response.message,
              });
              await this._firebaseService.updateUser(user.email, false);
              setTimeout(async () => {
                await this.getAllUsersList();
                this.loader = false;
              }, 1000);
            }
          });
      },
    });
  }

  private _blockUser(user: any) {
    this.confirmationService.confirm({
      message: `Czy na pewno chcesz zablokować użytkownika ${user.username}?`,
      header: 'Zablokuj użytkownika',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'TAK',
      rejectLabel: 'NIE',
      acceptButtonStyleClass: 'bg-green-600 border-none',
      rejectButtonStyleClass: 'bg-red-600 border-none',
      accept: async () => {
        this.loader = true;
        this._disableEnableUserService
          .disableUser(user.uid)
          .subscribe(async (response: any) => {
            if (response.status) {
              this.messageService.add({
                severity: 'success',
                summary: 'Zablokowano',
                detail: response.message,
              });
              await this._firebaseService.updateUser(user.email, true);
              setTimeout(async () => {
                await this.getAllUsersList();
                this.loader = false;
              }, 1000);
            }
          });
      },
    });
  }
}
