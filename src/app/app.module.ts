import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { SignsComponent } from './signs/signs.component';
import { StateService } from './state.service';
import { SignComponent } from './sign/sign.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { StatusOverlayComponent } from './status-overlay/status-overlay.component';

@NgModule({
  declarations: [
    AppComponent,
    SignsComponent,
    SignComponent,
    TopBarComponent,
    StatusOverlayComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [StateService],
  bootstrap: [AppComponent],
})
export class AppModule {}
