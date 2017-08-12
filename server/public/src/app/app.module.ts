import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import 'hammerjs';

import { MaterialModule } from './material.module';
import { AppComponent } from './main/app.component';
import { PlayerComponent } from './player/player.component';
import { ProjectorComponent } from './projector/projector.component';
import { LedComponent } from './led/led.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { SelectorComponent } from './selector/selector.component';
import { SocketService } from './tools/socket.service';
import { PlayerService } from './player/player.service';
import { PlaylistService } from './playlist/playlist.service';
import { ProjectorService } from './projector/projector.service';
import { CapitalizePipe } from './tools/capitalize.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    ProjectorComponent,
    LedComponent,
    PlaylistComponent,
    CapitalizePipe,
    SelectorComponent
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
    PlayerService,
    PlaylistService,
    ProjectorService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
