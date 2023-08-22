import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './basic/components/navbar/navbar.component';
import { MainPageComponent } from './basic/components/main-page/main-page.component';
import { LoginComponent } from './basic/components/login/login.component';
import { RegistrationComponent } from './basic/components/registration/registration.component';
import { ForgotPasswordComponent } from './basic/components/forgot-password/forgot-password.component';
import { StartingPageComponent } from './shared/components/starting-page/starting-page.component';
import { TermsComponent } from './shared/components/terms/terms.component';
import { AuthGuard } from './shared/services/auth-guard';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      {
        path: '',
        component: StartingPageComponent,
      },
      {
        path: 'regulamin',
        component: TermsComponent,
      },
    ],
  },
  { path: 'dashboard', component: NavbarComponent, canActivate: [AuthGuard] },
  { path: 'logowanie', component: LoginComponent },
  { path: 'rejestracja', component: RegistrationComponent },
  { path: 'zapomnialem-haslo', component: ForgotPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
