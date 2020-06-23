import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';

import { CoreModule } from '@app/core/core.module';
import { CORE_API_BASE_URL } from '@app/core/core.tokens';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/***
 * Base app module.
 */
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    { provide: CORE_API_BASE_URL, useValue: environment.apiBaseUrl },
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
