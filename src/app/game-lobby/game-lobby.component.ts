import { Component, OnInit } from '@angular/core';
import { MatchService } from '../shared/match.service';
import { Match } from '../models/match.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game-lobby',
  templateUrl: './game-lobby.component.html',
  styleUrls: ['./game-lobby.component.scss']
})
export class GameLobbyComponent implements OnInit {
  public matchID: number;

  public match: Match;

  public matches: Match[];

  constructor(private matchService: MatchService, private router: Router) { }

  ngOnInit(): void {
  }

  public getAllMatches() {
    this.matchService.getAllMatches().subscribe(matches => this.matches = matches);
  }
  public goToGameRoom(event, matchID) {
    this.router.navigate(['/game-room', matchID]);
  }

}
