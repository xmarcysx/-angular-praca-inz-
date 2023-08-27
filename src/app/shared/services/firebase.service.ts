import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  img = 'src/assets/images/logo.png';

  constructor(private _http: HttpClient) {}

  addUserToDatabase(username: string, email: string) {
    this._http
      .post(`${environment.firebaseConfig.databaseURL}/users.json`, {
        email: email,
        username: username,
        img: this.img,
      })
      .subscribe();
  }

  getUserDataByEmail(email: string) {
    return this._http
      .get(`${environment.firebaseConfig.databaseURL}/users.json`)
      .pipe(
        map((data: any) => {
          for (const userId in data) {
            if (data[userId].email === email) {
              return { id: userId, ...data[userId] };
            }
          }
          return null;
        })
      );
  }
}
