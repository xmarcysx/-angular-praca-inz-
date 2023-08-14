import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private _angularFireAuth: AngularFireAuth,
    private _router: Router,
    private _messageService: MessageService
  ) {}

  // rejestracja
  async signUp(email: string, password: string): Promise<void> {
    try {
      const result = await this._angularFireAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      if (result.user) {
        this._router.navigate(['dashboard']);
      }
    } catch (error) {
      this._handleAuthError(error);
    }
  }

  // logowanie
  async signIn(email: string, password: string): Promise<void> {
    try {
      const result = await this._angularFireAuth.signInWithEmailAndPassword(
        email,
        password
      );

      if (result.user) {
        this._router.navigate(['dashboard']);
      }
    } catch (error) {
      this._handleAuthError(error);
    }
  }

  // signOut() {
  //   return this.afAuth.signOut()
  //     .catch((error: FirebaseError) => {
  //       // Obsługa błędu wylogowania
  //       console.error('Firebase Error:', error.code, error.message);
  //       throw error; // Przekaż dalej błąd
  //     });
  // }

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
