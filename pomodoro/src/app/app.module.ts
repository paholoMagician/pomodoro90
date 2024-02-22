import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { componentModule } from './components-module/components.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ModalConfiguracionesComponent } from './components/shared/modals/modal-configuraciones/modal-configuraciones.component';
import { LoginModalComponent } from './components/dashboard/login-modal/login-modal.component';

@NgModule({
  
  declarations: [
    AppComponent
  ],

  imports: [    
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    componentModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],

  providers: [],
  bootstrap: [AppComponent]

})

export class AppModule { }
