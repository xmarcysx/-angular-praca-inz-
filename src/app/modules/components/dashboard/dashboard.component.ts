import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { log } from 'firebase-functions/logger';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class Dashboard implements OnInit {
  ifAdmin: boolean = false;

  constructor(
    private _angularFireAuth: AngularFireAuth,
    private _authService: AuthService
  ) {}

  ngOnInit() {
    this._angularFireAuth.currentUser.then((user: any) => {
      if (user.uid === this._authService.adminUid) {
        this.ifAdmin = true;
      }
    });
  }
}
