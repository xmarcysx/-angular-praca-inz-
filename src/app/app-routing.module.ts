import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './basic/components/main-page/main-page.component';
import { LoginComponent } from './shared/components/login/login.component';
import { RegistrationComponent } from './shared/components/registration/registration.component';
import { ForgotPasswordComponent } from './shared/components/forgot-password/forgot-password.component';
import { StartingPageComponent } from './shared/components/starting-page/starting-page.component';
import { TermsComponent } from './shared/components/terms/terms.component';
import { AuthGuard } from './shared/services/auth-guard';
import { AdminGuard } from './shared/services/admin-guard';
import { AboutUsComponent } from './shared/components/about-us/about-us.component';
import { PrivacyPolicyComponent } from './shared/components/privacy-policy/privacy-policy.component';
import { ContactComponent } from './shared/components/contact/contact.component';
import { SettingsComponent } from './shared/components/settings/settings.component';
import { ChangeUsernameComponent } from './shared/components/settings/change-username/change-username.component';
import { ChangeProfileLogoComponent } from './shared/components/settings/change-profile-logo/change-profile-logo.component';
import { ChangePasswordComponent } from './shared/components/settings/change-password/change-password.component';
import { ChangeEmailAddressComponent } from './shared/components/settings/change-email-address/change-email-address.component';
import { ManageUsersComponent } from './modules/components/admin/manage-users/manage-users.component';
import { NewsComponent } from './modules/components/news/news.component';
import { Dashboard } from './modules/components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      { path: '', component: StartingPageComponent },
      { path: 'regulamin', component: TermsComponent },
      { path: 'o_nas', component: AboutUsComponent },
      { path: 'polityka_prywatnosci', component: PrivacyPolicyComponent },
      { path: 'kontakt', component: ContactComponent },
      {
        path: 'ustawienia',
        component: SettingsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'ustawienia/zmiana_nazwy_uzytkownika',
        component: ChangeUsernameComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'ustawienia/zmiana_adresu_email',
        component: ChangeEmailAddressComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'ustawienia/zmiana_hasla',
        component: ChangePasswordComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'ustawienia/edycja_zdjecia_profilowego',
        component: ChangeProfileLogoComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'admin/uzytkownicy',
        component: ManageUsersComponent,
        canActivate: [AuthGuard, AdminGuard],
      },
      {
        path: 'wiadomosci',
        component: NewsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'dashboard',
        component: Dashboard,
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: 'dashboard', component: MainPageComponent, canActivate: [AuthGuard] },
  { path: 'logowanie', component: LoginComponent },
  { path: 'rejestracja', component: RegistrationComponent },
  { path: 'zapomnialem_haslo', component: ForgotPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
