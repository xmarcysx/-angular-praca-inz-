import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from './basic/components/navbar/navbar.component';
import { FooterComponent } from './basic/components/footer/footer.component';
import { MainPageComponent } from './basic/components/main-page/main-page.component';
import { LoginComponent } from './basic/components/login/login.component';
import { RegistrationComponent } from './basic/components/registration/registration.component';
import { ForgotPasswordComponent } from './basic/components/forgot-password/forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    MainPageComponent,
    LoginComponent,
    RegistrationComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
