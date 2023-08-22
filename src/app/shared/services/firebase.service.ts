import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  img = 'src/assets/images/logo.png';

  constructor(private _http: HttpClient) {}

  addUserToDatabase(username: string) {
    this._http
      .post(`${environment.firebaseConfig.databaseURL}/users.json`, {
        username: username,
        img: this.img,
      })
      .subscribe();
  }
}
