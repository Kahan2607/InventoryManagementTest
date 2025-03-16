import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAuth0 } from '@auth0/auth0-angular';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),   
    provideRouter(routes),
    provideAuth0({
      domain: 'kahan2607.jp.auth0.com',
      clientId: '8BjHg211CN1WrngcXMO0IAB9XVkPf7fW',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
  ]

};
