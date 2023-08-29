import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subject, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  usernameHasChanged: Subject<string> = new Subject();

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

  updateEmailInFirebase(oldEmail: string, newEmail: string) {
    this._http
      .get(`${environment.firebaseConfig.databaseURL}/users.json`)
      .subscribe(
        (data: any) => {
          const userIdToUpdate = Object.keys(data).find(
            (userId) => data[userId].email === oldEmail
          );

          if (userIdToUpdate) {
            const updates = {
              [`/${userIdToUpdate}/email`]: newEmail,
            };

            this._http
              .patch(
                `${environment.firebaseConfig.databaseURL}/users.json`,
                updates
              )
              .subscribe(
                () => {
                  console.log('Email updated successfully');
                },
                (error) => {
                  console.error('Error updating email:', error);
                }
              );
          } else {
            console.error('User not found');
          }
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
  }

  async updateUsernameByEmail(email: string, newUsername: string) {
    this._http
      .get(`${environment.firebaseConfig.databaseURL}/users.json`)
      .subscribe(
        (data: any) => {
          const userIdToUpdate = Object.keys(data).find(
            (userId) => data[userId].email === email
          );

          if (userIdToUpdate) {
            const updates = {
              [`/${userIdToUpdate}/username`]: newUsername,
            };

            this._http
              .patch(
                `${environment.firebaseConfig.databaseURL}/users.json`,
                updates
              )
              .subscribe(
                () => {
                  console.log('Username updated successfully');
                },
                (error) => {
                  console.error('Error updating username:', error);
                }
              );
            this.usernameHasChanged.next(newUsername);
          } else {
            console.error('User not found');
          }
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
  }
}
