import { Injectable, Inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginStorageService } from './login-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private _angularFireAuth: AngularFireAuth,
    private _router: Router,
    private _messageService: MessageService,
    private _loginStorageService: LoginStorageService
  ) {}

  isLoggedIn: boolean = false;
  email: string = '';

  // rejestracja
  async signUp(email: string, password: string): Promise<void> {
    try {
      const result = await this._angularFireAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      if (result.user) {
        this._router.navigate(['logowanie']);
      }
    } catch (error) {
      this._handleAuthError(error);
    }
  }

  // logowanie
  async signIn(email: string, password: string): Promise<void> {
    this._angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this._messageService.add({
          severity: 'success',
          summary: 'Sukces',
          detail: 'Użytkownik został zalogowany',
        });
        this.isLoggedIn = true;
        this.email = email;
        this._router.navigate(['ustawienia']);
      })
      .catch((error) => {
        this._handleAuthError(error);
        this._router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => this._router.navigate(['/logowanie']));
      });
  }

  //resetowanie hasła
  async resetPassword(email: string): Promise<void> {
    this._angularFireAuth
      .sendPasswordResetEmail(email)
      .then(() => {
        this._messageService.add({
          severity: 'success',
          summary: 'Sukces',
          detail: 'Email z prośbą o zresetowanie hasła został wysłany',
        });
        this._router.navigate(['logowanie']);
      })
      .catch((error) => {
        this._handleAuthError(error);
      });
  }

  isAuthenticated(): boolean {
    if (this.isLoggedIn) {
      return true;
    } else {
      return false;
    }
  }

  //wylogowanie
  async signOut(): Promise<void> {
    return this._angularFireAuth
      .signOut()
      .then(() => {
        this._messageService.add({
          severity: 'success',
          summary: 'Sukces',
          detail: 'Użytkownik został wylogowany',
        });
        this._router.navigate(['/']);
        this.isLoggedIn = false;
        this._loginStorageService.removeLoginStorage();
      })
      .catch((error) => {
        this._handleAuthError(error);
      });
  }

  private _handleAuthError(error: any): void {
    switch (error.code) {
      case 'auth/email-already-in-use':
        this._showErrorMessage(
          'Podany adres e-mail jest już używany przez inne konto'
        );
        break;
      case 'auth/network-request-failed':
        this._showErrorMessage(
          'Wystąpił błąd sieci (taki jak przekroczenie limitu czasu, przerwane połączenie lub nieosiągalny host)'
        );
        break;
      case 'auth/user-not-found':
        this._showErrorMessage('Podany użytkownik nie został znaleziony');
        break;
      case 'auth/wrong-password':
        this._showErrorMessage('Podane hasło jest nieprawidłowe');
        break;
      case 'auth/user-disabled':
        this._showErrorMessage('Podany użytkownik jest zablokowany');
        break;
      default:
        break;
    }
  }

  private _showErrorMessage(message: string): void {
    this._messageService.add({
      severity: 'error',
      summary: 'Błąd',
      detail: message,
    });
  }
}
