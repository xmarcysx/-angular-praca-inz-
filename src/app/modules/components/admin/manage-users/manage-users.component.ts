import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from 'primeng/api';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.components.html',
  styleUrls: ['./manage-users.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class ManageUsersComponent {
  users: any[] = [];

  constructor(
    private _authService: AuthService,
    private _firebaseService: FirebaseService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.getAllUsersList();
  }

  getAllUsersList() {
    this._firebaseService.getAllUsers().subscribe((res) => {
      this.users = res;
      console.log(res);
    });
  }

  showBlockUnblockModal(user: any) {
    if (user.disabled) {
      this.confirmationService.confirm({
        message: `Czy na pewno chcesz odblokować użytkownika ${user.username}?`,
        header: 'Odblokuj użytkownika',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'TAK',
        rejectLabel: 'NIE',
        acceptButtonStyleClass: 'bg-green-600 border-none',
        rejectButtonStyleClass: 'bg-red-600 border-none',
        accept: async () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Odblikowano',
            detail: 'Użytkownik został odblokowany',
          });
          await this._firebaseService.updateUser(user.email, false);
          setTimeout(() => {
            this.getAllUsersList();
          }, 500);
        },
      });
    } else {
      this.confirmationService.confirm({
        message: `Czy na pewno chcesz zablokować użytkownika ${user.username}?`,
        header: 'Zablokuj użytkownika',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'TAK',
        rejectLabel: 'NIE',
        acceptButtonStyleClass: 'bg-green-600 border-none',
        rejectButtonStyleClass: 'bg-red-600 border-none',
        accept: async () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Zablokowano',
            detail: 'Użytkownik został zablokowany',
          });
          await this._firebaseService.updateUser(user.email, true);
          setTimeout(() => {
            this.getAllUsersList();
          }, 500);
        },
      });
    }
  }
}
