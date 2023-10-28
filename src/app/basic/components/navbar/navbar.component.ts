import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { ThemeStorageService } from 'src/app/shared/services/theme-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  private emailSubscription!: Subscription;
  private usernameSubscription!: Subscription;
  private imageSubscription!: Subscription;

  isLoggedInAdmin: boolean = false;
  isLoggedIn: boolean = false;
  root = window.document.documentElement;
  themeName: string = '';
  isHidden: boolean = true;
  email: string = '';
  userData: any;

  constructor(
    private el: ElementRef,
    private _themeStorageService: ThemeStorageService,
    private _router: Router,
    private _authSerivce: AuthService,
    private _firebaseService: FirebaseService
  ) {}

  logo = '../../../../assets/images/userProfile.png';

  async ngOnInit() {
    document.addEventListener('click', this.handleClickOutside.bind(this));

    this.isLoggedInAdmin = this._authSerivce.isLoggedInAdmin;
    this.isLoggedIn = this._authSerivce.isLoggedIn;
    this.email = this._authSerivce.email;
    this._getUserData(this.email);

    this.usernameSubscription =
      this._firebaseService.usernameHasChanged.subscribe(() => {
        setTimeout(() => {
          this._getUserData(this.email);
        }, 1000);
      });

    this.imageSubscription = this._firebaseService.imageHasChanged.subscribe(
      () => {
        setTimeout(() => {
          this._getUserData(this.email);
        }, 1000);
      }
    );

    this.emailSubscription = this._authSerivce.emailHasChanged.subscribe(
      (newEmail) => {
        this.email = newEmail;
        setTimeout(() => {
          this._getUserData(this.email);
        }, 1000);
      }
    );

    this.themeName = this._themeStorageService.loadNavTheme();
  }

  handleClickOutside(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.isHidden = true;
    }
  }

  openSettings() {
    this.isHidden = !this.isHidden;
  }

  onToggleTheme() {
    this.themeName = this._themeStorageService.toggleNavTheme();
  }

  navigateToLogin() {
    this._router.navigate(['logowanie']);
  }

  navigateToSettings() {
    this._router.navigate(['ustawienia']);
  }

  logout() {
    this.isLoggedInAdmin = false;
    this.isLoggedIn = false;
    this._authSerivce.signOut();
  }

  private async _getUserData(email: string) {
    this._firebaseService.getUserDataByEmail(email).subscribe((data) => {
      this.userData = data;
    });
  }

  ngOnDestroy() {
    if (this.emailSubscription) {
      this.emailSubscription.unsubscribe();
    }

    if (this.usernameSubscription) {
      this.usernameSubscription.unsubscribe();
    }

    if (this.imageSubscription) {
      this.imageSubscription.unsubscribe();
    }
  }
}
