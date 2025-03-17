import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { Auth0Component } from './auth0/auth0.component';

export const routes: Routes = [
    {
        path: '', 
        loadComponent: () => {
            return import('./auth0/auth0.component').then(m => m.Auth0Component); // lazy loading of the auth0 component
        }

    },
    {
        path: 'home', 
        loadComponent: () => {
            return import('./home/home.component').then(m => m.HomeComponent); // lazy loading
        } 

    },
];
