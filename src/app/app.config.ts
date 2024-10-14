import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { LuxonDateAdapter } from '@angular/material-luxon-adapter';
import { MY_DATE_FORMATS } from '../shared/modules/sharedmodule.module';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    {provide : DateAdapter, useClass: LuxonDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    provideHttpClient()

  ]
};
