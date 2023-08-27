import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './basic/components/main-page/main-page.component';
import { LoginComponent } from './shared/components/login/login.component';
import { RegistrationComponent } from './shared/components/registration/registration.component';
import { ForgotPasswordComponent } from './shared/components/forgot-password/forgot-password.component';
import { StartingPageComponent } from './shared/components/starting-page/starting-page.component';
import { TermsComponent } from './shared/components/terms/terms.component';
import { AuthGuard } from './shared/services/auth-guard';
import { AboutUsComponent } from './shared/components/about-us/about-us.component';
import { PrivacyPolicyComponent } from './shared/components/privacy-policy/privacy-policy.component';
import { ContactComponent } from './shared/components/contact/contact.component';
import { SettingsComponent } from './shared/components/settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      { path: '', component: StartingPageComponent },
      { path: 'regulamin', component: TermsComponent },
      { path: 'o-nas', component: AboutUsComponent },
      { path: 'polityka-prywatnosci', component: PrivacyPolicyComponent },
      { path: 'kontakt', component: ContactComponent },
      {
        path: 'ustawienia',
        component: SettingsComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: 'dashboard', component: MainPageComponent, canActivate: [AuthGuard] },
  { path: 'logowanie', component: LoginComponent },
  { path: 'rejestracja', component: RegistrationComponent },
  { path: 'zapomnialem-haslo', component: ForgotPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
