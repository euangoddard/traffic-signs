import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { SignsComponent } from './signs/signs.component';
import { StateService } from './state.service';
import { SignComponent } from './sign/sign.component';

@NgModule({
  declarations: [AppComponent, SignsComponent, SignComponent],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [StateService],
  bootstrap: [AppComponent],
})
export class AppModule {}
