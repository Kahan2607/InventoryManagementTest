import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth0',
  imports: [],
  templateUrl: './auth0.component.html',
  styleUrl: './auth0.component.scss'
})
export class Auth0Component {
  constructor(public auth: AuthService, private router: Router) {
    
  }
  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(isAuthenticated => {
      if (!isAuthenticated) {
        this.auth.loginWithRedirect();
      }
      else {
        this.router.navigate(['/home']);  // Navigate to home after login
      }
    });
  }
}
