import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from './basic/components/navbar/navbar.component';
import { FooterComponent } from './basic/components/footer/footer.component';
import { MainPageComponent } from './basic/components/main-page/main-page.component';
import { LoginComponent } from './shared/components/login/login.component';
import { RegistrationComponent } from './shared/components/registration/registration.component';
import { ForgotPasswordComponent } from './shared/components/forgot-password/forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StartingPageComponent } from './shared/components/starting-page/starting-page.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { LoadingBallComponent } from './shared/components/loading-ball/loading-ball.component';
import { SettingsComponent } from './shared/components/settings/settings.component';
import { ChangeEmailAddressComponent } from './shared/components/settings/change-email-address/change-email-address.component';
import { ChangePasswordComponent } from './shared/components/settings/change-password/change-password.component';
import { ChangeUsernameComponent } from './shared/components/settings/change-username/change-username.component';
import { ChangeProfileLogoComponent } from './shared/components/settings/change-profile-logo/change-profile-logo.component';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ManageUsersComponent } from './modules/components/admin/manage-users/manage-users.component';
import { NewsComponent } from './modules/components/news/news.component';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { EditorModule } from 'primeng/editor';
import { DashboardNews } from './modules/components/dashboard/news/dashboard-news.component';
import { Dashboard } from './modules/components/dashboard/dashboard.component';
import { DashboardAdminUsers } from './modules/components/dashboard/admin-users/dashboard-admin-users.component';
import { CompetitionComponent } from './modules/components/competition/competition.component';
import { DashboardCompetitionComponent } from './modules/components/dashboard/competition/dashboard-competition.component';
import { ResultsComponent } from './modules/components/results/results.component';
import { DashboardTodayMatches } from './modules/components/dashboard/today-matches/dashboard-today-matches.component';
import { SingleMatchComponenet } from './modules/components/dashboard/today-matches/single-match/single-match.component';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NewsComponent,
    FooterComponent,
    MainPageComponent,
    LoginComponent,
    RegistrationComponent,
    ForgotPasswordComponent,
    StartingPageComponent,
    LoadingBallComponent,
    SettingsComponent,
    ChangeEmailAddressComponent,
    ChangePasswordComponent,
    ChangeUsernameComponent,
    ChangeProfileLogoComponent,
    ManageUsersComponent,
    DashboardNews,
    Dashboard,
    DashboardAdminUsers,
    DashboardCompetitionComponent,
    CompetitionComponent,
    ResultsComponent,
    DashboardTodayMatches,
    SingleMatchComponenet,
  ],
  imports: [
    EditorModule,
    DialogModule,
    SelectButtonModule,
    InputNumberModule,
    InputTextModule,
    PaginatorModule,
    ConfirmDialogModule,
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    HttpClientModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireDatabaseModule,
    ToastModule,
    CommonModule,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
