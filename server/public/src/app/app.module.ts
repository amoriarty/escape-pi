import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import 'hammerjs';

import { MaterialModule } from './tools/material.module';
import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { ProjectorComponent } from './projector/projector.component';
import { LedComponent } from './led/led.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { SelectorComponent } from './selector/selector.component';
import { SocketService } from './tools/socket.service';
import { PlaylistService } from './playlist/playlist.service';
import { CapitalizePipe } from './tools/capitalize.pipe';
import { TimerComponent } from './timer/timer.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    ProjectorComponent,
    LedComponent,
    PlaylistComponent,
    CapitalizePipe,
    SelectorComponent,
    TimerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule
  ],
  entryComponents: [
    PlaylistComponent
  ],
  providers: [
    SocketService,
    PlaylistService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
