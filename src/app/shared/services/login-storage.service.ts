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
    sessionStorage.setItem('LoginStorage', JSON.stringify(loginObject));
  }

  getLoginStorage() {
    return sessionStorage.getItem('LoginStorage');
  }
}
