import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, Subject, map, switchMap } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  public adminUid = 'Aqp48LBhNmfoQddxYO8fyfLWawx2';
  usernameHasChanged: Subject<string> = new Subject();
  imageHasChanged: Subject<string> = new Subject();

  img = 'src/assets/images/logo.png';

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _messageService: MessageService
  ) {}

  addUserToDatabase(username: string, email: string, uid: any) {
    this._http
      .post(`${environment.firebaseConfig.databaseURL}/users.json`, {
        email: email,
        username: username,
        img: '',
        disabled: false,
        uid: uid.__zone_symbol__value,
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

  getAllUsers() {
    return this._http
      .get(`${environment.firebaseConfig.databaseURL}/users.json`)
      .pipe(
        map((users) => {
          const usersArray = Object.values(users);
          if (usersArray) {
            const filteredUsers = usersArray.filter(
              (user) => user.username !== 'Administrator'
            );
            return filteredUsers;
          } else {
            return [];
          }
        })
      );
  }

  getAllTeamsForCompetition() {
    return this._http
      .get(`${environment.firebaseConfig.databaseURL}/teams.json`)
      .pipe(
        map((team) => {
          const teamsArray = Object.values(team);
          if (teamsArray) {
            return teamsArray;
          } else {
            return [];
          }
        })
      );
  }

  getAllUsersAdmin() {
    return this._http
      .get(`${environment.firebaseConfig.databaseURL}/users.json`)
      .pipe(
        map((users) => {
          const usersArray = Object.values(users);
          if (usersArray) {
            const filteredUsers = usersArray.filter(
              (user) => user.uid !== this.adminUid
            );
            return filteredUsers;
          } else {
            return [];
          }
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
                  this._messageService.add({
                    severity: 'success',
                    summary: 'Sukces',
                    detail: 'Adres e-mail został zmieniony',
                  });
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

  async updateProfileLogo(email: string, newImage: string) {
    this._http
      .get(`${environment.firebaseConfig.databaseURL}/users.json`)
      .subscribe(
        (data: any) => {
          const userIdToUpdate = Object.keys(data).find(
            (userId) => data[userId].email === email
          );

          if (userIdToUpdate) {
            const updates = {
              [`/${userIdToUpdate}/img`]: newImage,
            };

            this._http
              .patch(
                `${environment.firebaseConfig.databaseURL}/users.json`,
                updates
              )
              .subscribe(
                () => {
                  this._router.navigate(['/ustawienia']);
                  this._messageService.add({
                    severity: 'success',
                    summary: 'Sukces',
                    detail: 'Logo zostało zmienione',
                  });
                },
                (error) => {
                  console.error('Error updating profile logo:', error);
                }
              );
            this.imageHasChanged.next(newImage);
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
                  this._router.navigate(['/ustawienia']);
                  this._messageService.add({
                    severity: 'success',
                    summary: 'Sukces',
                    detail: 'Nazwa użytkownika została zmieniona',
                  });
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

  async updateUser(email: string, disabledStatus: boolean) {
    this._http
      .get(`${environment.firebaseConfig.databaseURL}/users.json`)
      .subscribe(
        (data: any) => {
          const userIdToUpdate = Object.keys(data).find(
            (userId) => data[userId].email === email
          );

          if (userIdToUpdate) {
            const updates = {
              [`/${userIdToUpdate}/disabled`]: disabledStatus,
            };

            this._http
              .patch(
                `${environment.firebaseConfig.databaseURL}/users.json`,
                updates
              )
              .subscribe(
                () => {},
                (error) => {
                  console.error('Error updating username:', error);
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

  addMessageToDatabase(userEmail: string, message: any) {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Dodaj 1, ponieważ styczeń ma indeks 0
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const formattedMinutes = minutes.toString().padStart(2, '0'); // Dodaj wiodący zerowy znak

    const formattedDate = `${day}.${month}.${year} - ${hours}:${formattedMinutes}`;
    this._http
      .post(`${environment.firebaseConfig.databaseURL}/teams.json`, {
        userEmail: userEmail,
        message: message,
        date: formattedDate,
      })
      .subscribe();
  }

  getAllMessages(): Observable<any> {
    return this._http.get(
      `${environment.firebaseConfig.databaseURL}/messages.json`
    );
  }
}
