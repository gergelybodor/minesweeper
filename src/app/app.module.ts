import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';

import { LoginService } from './login/login.service';
import { AuthGuard } from './auth.guard';

export const fireBaseConfig = {
    apiKey: 'AIzaSyA0hQ_xYTiFevQjgjl6vj2jobfPV1DzqSw',
    authDomain: 'project-portal-2a709.firebaseapp.com',
    databaseURL: 'https://project-portal-2a709.firebaseio.com',
    projectId: 'project-portal-2a709',
    storageBucket: 'project-portal-2a709.appspot.com',
    messagingSenderId: '49816913030'
};

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        UsersComponent,
        LoginComponent,
        NavigationComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(fireBaseConfig),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        NgbModule.forRoot(),
        NgbDropdownModule.forRoot()
    ],
    providers: [
        LoginService,
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
