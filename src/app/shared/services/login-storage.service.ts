import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginStorageService {
  constructor() {}

  setLoginStorage(email: string, password: string) {
    const loginObject = {
      email: email,
      password: password,
    };
    localStorage.setItem('LoginStorage', JSON.stringify(loginObject));
  }

  getLoginStorage() {
    return localStorage.getItem('LoginStorage');
  }

  removeLoginStorage() {
    localStorage.removeItem('LoginStorage');
  }
}
