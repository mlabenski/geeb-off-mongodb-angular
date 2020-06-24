import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameRoomComponent } from './game-room/game-room.component';
import { AppComponent } from './app.component';
import { LobbyComponent } from './lobby/lobby.component';
import { GameLobbyComponent } from './game-lobby/game-lobby.component';

const routes: Routes = [
  {path: 'queue', component: LobbyComponent}, 
  {path : 'game-lobby', component: GameLobbyComponent},
  {path : 'game-room/:id', component: GameRoomComponent},
  {path: '', component: LobbyComponent}
  ];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
