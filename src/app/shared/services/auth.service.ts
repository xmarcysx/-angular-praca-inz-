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

  async signIn(email: string, password: string): Promise<void> {
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
