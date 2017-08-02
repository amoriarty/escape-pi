import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import 'hammerjs';

import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { ProjectorComponent } from './projector/projector.component';
import { LedComponent } from './led/led.component';
import { PlaylistComponent } from './playlist/playlist.component';

import { SocketService } from './socket/socket.service';
import { PlaylistService } from './playlist/playlist.service';
import { ProjectorService } from './projector/projector.service';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    ProjectorComponent,
    LedComponent,
    PlaylistComponent
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
    ProjectorService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
