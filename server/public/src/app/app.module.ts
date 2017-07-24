import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import 'hammerjs';

import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { ProjectorComponent } from './projector/projector.component';
import { LedComponent } from './led/led.component';

import { SocketService } from './socket.service';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    ProjectorComponent,
    LedComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [ SocketService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
