import { Component, OnInit } from '@angular/core';
import { MatchService } from '../shared/match.service';
import { Match } from '../models/match.model';
import { ActivatedRoute } from '@angular/router';
import { TwitchVideoComponent } from '../twitch-video/twitch-video.component';
@Component({
  selector: 'app-game-room',
  templateUrl: './game-room.component.html',
  styleUrls: ['./game-room.component.scss']
})
export class GameRoomComponent implements OnInit {
  public matchID: number;
  private sub: any;
  public channelSelected: string;

  public match: Match;

  public matches: Match[];

  constructor(private matchService: MatchService, private route: ActivatedRoute) { 
    this.channelSelected = "RuptureXX";
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.matchID = +params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
   });
   this.matchService.getMatch(this.matchID).subscribe(match => this.match = match);
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }


}
