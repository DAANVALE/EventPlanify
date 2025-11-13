import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app/app.component';


import './styles.css';
import 'primeng';

//quitar porque hay doble bootstrapApplication?
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { jwtInterceptor } from './app/auth/jwt-interceptor';
import { errorInterceptor } from './app/auth/error-interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserAnimationsModule),
    provideHttpClient(withInterceptors([jwtInterceptor, errorInterceptor])),
    provideRouter(routes),
  ],
}).catch((err) => console.error(err));
