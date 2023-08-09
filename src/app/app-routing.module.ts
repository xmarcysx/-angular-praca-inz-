import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './basic/components/navbar/navbar.component';
import { MainPageComponent } from './basic/components/main-page/main-page.component';
import { LoginComponent } from './basic/components/login/login.component';
import { RegistrationComponent } from './basic/components/registration/registration.component';
import { ForgotPasswordComponent } from './basic/components/forgot-password/forgot-password.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'dashboard', component: NavbarComponent },
  { path: 'logowanie', component: LoginComponent },
  { path: 'rejestracja', component: RegistrationComponent },
  { path: 'zapomnialem-haslo', component: ForgotPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
