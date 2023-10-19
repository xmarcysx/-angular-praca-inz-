import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DisableEnableUserService {
  constructor(private http: HttpClient) {}

  enableUser(uid: string) {
    return this.http.post(`http://localhost:3000/api/odblokuj`, {
      uid: uid,
    });
  }

  disableUser(uid: string) {
    return this.http.post(`http://localhost:3000/api/zablokuj`, {
      uid: uid,
    });
  }
}
