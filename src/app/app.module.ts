import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from "@angular/fire";
import { AngularFireFunctionsModule, REGION } from "@angular/fire/functions";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { fromEventPattern } from 'rxjs';
import { CountdownModule } from 'ngx-countdown';
import { MatchService } from './shared/match.service';

import { environment } from "src/environments/environment";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersService } from './shared/users.service';
import { TwitchVideoComponent } from './twitch-video/twitch-video.component';
import { CountdownComponent } from './countdown/countdown.component';
import { GameRoomComponent } from './game-room/game-room.component';
import { LobbyComponent } from './lobby/lobby.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { GameLobbyComponent } from './game-lobby/game-lobby.component';

@NgModule({
  declarations: [
    AppComponent,
    TwitchVideoComponent,
    CountdownComponent,
    GameRoomComponent,
    LobbyComponent,
    GameLobbyComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    CountdownModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireFunctionsModule
  ],
  providers: [UsersService, FormsModule, MatchService, { provide: REGION, useValue: 'us-central1'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
