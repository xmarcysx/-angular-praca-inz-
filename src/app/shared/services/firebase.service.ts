import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  Observable,
  Subject,
  forkJoin,
  map,
  mergeMap,
  switchMap,
  tap,
  toArray,
} from 'rxjs';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { log } from 'firebase-functions/logger';

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
        uid: uid,
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
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const formattedMinutes = minutes.toString().padStart(2, '0');

    this.getUserDataByEmail(userEmail)
      .pipe(
        switchMap((res) => {
          const userUID = res.uid;
          const formattedDate = `${day}.${month}.${year} - ${hours}:${formattedMinutes}`;
          return this._http.post(
            `${environment.firebaseConfig.databaseURL}/messages.json`,
            {
              userUID,
              message,
              date: formattedDate,
            }
          );
        })
      )
      .subscribe();
  }

  getAllMessages(): Observable<any> {
    return this._http.get(
      `${environment.firebaseConfig.databaseURL}/messages.json`
    );
  }

  getAllLeagueRounds(): Observable<any> {
    const rounds$ = this._http
      .get(`${environment.firebaseConfig.databaseURL}/matches.json`)
      .pipe(map((response) => Object.values(response)));

    const teams$ = this._http
      .get(`${environment.firebaseConfig.databaseURL}/teams.json`)
      .pipe(map((response) => Object.values(response)));

    return forkJoin([rounds$, teams$]).pipe(
      map(([rounds, teams]) => {
        return rounds.map((matches) => {
          return matches.map((match: { homeTeamId: any; awayTeamId: any }) => {
            const homeTeam = teams.find((team) => team.id === match.homeTeamId);
            const awayTeam = teams.find((team) => team.id === match.awayTeamId);
            return { ...match, homeTeam, awayTeam };
          });
        });
      })
    );
  }

  getAllTodaysMatches(): Observable<any> {
    const today = new Date();

    const currentDate = today.getDate();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();

    const formattedDate = `${currentDate
      .toString()
      .padStart(2, '0')}.${currentMonth
      .toString()
      .padStart(2, '0')}.${currentYear}`;

    const rounds$ = this._http
      .get(`${environment.firebaseConfig.databaseURL}/matches.json`)
      .pipe(map((response) => Object.values(response)));

    const teams$ = this._http
      .get(`${environment.firebaseConfig.databaseURL}/teams.json`)
      .pipe(map((response) => Object.values(response)));

    return forkJoin([rounds$, teams$]).pipe(
      mergeMap(([rounds, teams]) => {
        const allMatches = rounds.flatMap((matches) =>
          matches.filter(
            (match: { date: string }) => match.date === formattedDate
          )
        );
        const matchesWithTeams = allMatches.map(
          (match: { homeTeamId: any; awayTeamId: any }) => {
            const homeTeam = teams.find((team) => team.id === match.homeTeamId);
            const awayTeam = teams.find((team) => team.id === match.awayTeamId);
            return { ...match, homeTeam, awayTeam };
          }
        );
        return matchesWithTeams;
      }),
      toArray()
    );
  }

  goalScored(
    roundId: number,
    matchId: number,
    isHome: boolean,
    data: any
  ): Observable<any> {
    const url = `${environment.firebaseConfig.databaseURL}/matches/${roundId}/${matchId}.json`;

    return this._http.get(url).pipe(
      switchMap((existingData: any) => {
        if (isHome) {
          if (existingData && existingData.homeTeamGoals) {
            existingData.homeTeamGoals.push(data);
          } else {
            existingData = { homeTeamGoals: [data] };
          }
        } else {
          if (existingData && existingData.awayTeamGoals) {
            existingData.awayTeamGoals.push(data);
          } else {
            existingData = { awayTeamGoals: [data] };
          }
        }

        return this._http.patch(url, existingData);
      })
    );
  }

  changeStatus(
    roundId: number,
    matchId: number,
    status: string
  ): Observable<any> {
    const url = `${environment.firebaseConfig.databaseURL}/matches/${roundId}/${matchId}.json`;
    return this._http.patch(url, { status: status });
  }

  addPointsAfterFinishedMatch(
    homeGoals: number,
    awayGoals: number,
    homeTeamId: number,
    awayTeamId: number
  ) {
    const urlHomeTeam = `${environment.firebaseConfig.databaseURL}/teams/${homeTeamId}.json`;
    const urlAwayTeam = `${environment.firebaseConfig.databaseURL}/teams/${awayTeamId}.json`;

    if (homeGoals > awayGoals) {
      forkJoin([
        this._http.get(urlHomeTeam),
        this._http.get(urlAwayTeam),
      ]).subscribe(([homeTeamData, awayTeamData]: [any, any]) => {
        this._http
          .patch(urlHomeTeam, {
            points: homeTeamData.points + 3,
            scoredGoals: homeTeamData.scoredGoals + homeGoals,
            lostGoals: homeTeamData.lostGoals + awayGoals,
          })
          .subscribe();
        this._http
          .patch(urlAwayTeam, {
            points: awayTeamData.points + 0,
            scoredGoals: awayTeamData.scoredGoals + awayGoals,
            lostGoals: awayTeamData.lostGoals + homeGoals,
          })
          .subscribe();
      });
    } else if (homeGoals < awayGoals) {
      forkJoin([
        this._http.get(urlHomeTeam),
        this._http.get(urlAwayTeam),
      ]).subscribe(([homeTeamData, awayTeamData]: [any, any]) => {
        this._http
          .patch(urlHomeTeam, {
            points: homeTeamData.points + 0,
            scoredGoals: homeTeamData.scoredGoals + homeGoals,
            lostGoals: homeTeamData.lostGoals + awayGoals,
          })
          .subscribe();
        this._http
          .patch(urlAwayTeam, {
            points: awayTeamData.points + 3,
            scoredGoals: awayTeamData.scoredGoals + awayGoals,
            lostGoals: awayTeamData.lostGoals + homeGoals,
          })
          .subscribe();
      });
    } else {
      forkJoin([
        this._http.get(urlHomeTeam),
        this._http.get(urlAwayTeam),
      ]).subscribe(([homeTeamData, awayTeamData]: [any, any]) => {
        this._http
          .patch(urlHomeTeam, {
            points: homeTeamData.points + 1,
            scoredGoals: homeTeamData.scoredGoals + homeGoals,
            lostGoals: homeTeamData.lostGoals + awayGoals,
          })
          .subscribe();
        this._http
          .patch(urlAwayTeam, {
            points: awayTeamData.points + 1,
            scoredGoals: awayTeamData.scoredGoals + homeGoals,
            lostGoals: awayTeamData.lostGoals + awayGoals,
          })
          .subscribe();
      });
    }
  }
}
