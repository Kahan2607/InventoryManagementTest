import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-auth0',
  imports: [],
  templateUrl: './auth0.component.html',
  styleUrl: './auth0.component.scss'
})
export class Auth0Component {
  constructor(public auth: AuthService) {
    auth.loginWithRedirect();
  }
}
