import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Component } from '@angular/core';
import { take } from 'rxjs';

@Component({
  selector: 'app-dashboard-admin-users',
  templateUrl: './dashboard-admin-users.components.html',
  styleUrls: ['./dashboard-admin-users.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class DashboardAdminUsers {
  users: any[] = [];
  loadingBall: boolean = false;

  constructor(private _firebaseService: FirebaseService) {}

  async ngOnInit() {
    this.getAllUsersList();
  }

  getAllUsersList() {
    this.loadingBall = true;
    this._firebaseService
      .getAllUsersAdmin()
      .pipe(take(5))
      .subscribe((res) => {
        this.users = res;
        this.loadingBall = false;
      });
  }
}
