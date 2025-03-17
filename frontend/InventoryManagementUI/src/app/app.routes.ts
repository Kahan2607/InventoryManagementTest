import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { Auth0Component } from './auth0/auth0.component';

export const routes: Routes = [
    {path: '', component: Auth0Component},
    {path: 'home', component: HomeComponent},
];
