import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game-lobby',
  templateUrl: './game-lobby.component.html',
  styleUrls: ['./game-lobby.component.scss']
})
export class GameLobbyComponent implements OnInit {
  public matchID: number;


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
