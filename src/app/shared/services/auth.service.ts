import { Injectable, Inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginStorageService } from './login-storage.service';
import { FirebaseService } from './firebase.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private _angularFireAuth: AngularFireAuth,
    private _router: Router,
    private _messageService: MessageService,
    private _loginStorageService: LoginStorageService,
    private _firebaseService: FirebaseService
  ) {}

  isLoggedInAdmin: boolean = false;
  isLoggedIn: boolean = false;
  email: string = '';

  emailHasChanged: Subject<string> = new Subject();

  // rejestracja
  async signUp(email: string, password: string): Promise<any> {
    try {
      const result = await this._angularFireAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      if (result.user) {
        this._router.navigate(['logowanie']);
        return result.user.uid;
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
        if (email === 'administrator@regionalnielive.firebaseapp.com')
          this.isLoggedInAdmin = true;
        this.isLoggedIn = true;
        this.email = email;
        this._router.navigate(['/dashboard']);
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

  async changePassword(newPassword: string): Promise<void> {
    try {
      const user = await this._angularFireAuth.currentUser;
      if (!user) {
        this._messageService.add({
          severity: 'error',
          summary: 'Błąd',
          detail: 'Użytkownik nie istnieje',
        });
        return;
      }
      await user.updatePassword(newPassword);

      const email = user.email;
      const getLoginStorage = this._loginStorageService.getLoginStorage();
      if (email && getLoginStorage) {
        this._loginStorageService.setLoginStorage(email, newPassword);
      }
      this._router.navigate(['/ustawienia']);
      this._messageService.add({
        severity: 'success',
        summary: 'Sukces',
        detail: 'Hasło zostało zmienione',
      });
    } catch (error) {
      this._handleAuthError(error);
    }
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
        this.isLoggedInAdmin = false;
        this.isLoggedIn = false;
        this._loginStorageService.removeLoginStorage();
      })
      .catch((error) => {
        this._handleAuthError(error);
      });
  }

  async changeEmail(beforeEmail: string, newEmail: string) {
    this._angularFireAuth.currentUser.then((user) => {
      if (beforeEmail === user?.email) {
        user
          .updateEmail(newEmail)
          .then(() => {
            const getLoginStorage = this._loginStorageService.getLoginStorage();
            if (getLoginStorage) {
              const loginLocalStorageData = JSON.parse(getLoginStorage);
              const password = loginLocalStorageData.password;
              this._loginStorageService.setLoginStorage(newEmail, password);
            }
            this._firebaseService.updateEmailInFirebase(beforeEmail, newEmail);

            this.emailHasChanged.next(newEmail);

            this._router.navigate(['/ustawienia']);
          })
          .catch((error) => {
            this._handleAuthError(error);
          });
      } else {
        this._messageService.add({
          severity: 'error',
          summary: 'Błąd',
          detail: 'Poprzedni adres email jest nieprawidłowy',
        });
        return;
      }
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
