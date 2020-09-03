import { Component, OnInit, Input} from '@angular/core';
@Component({
  selector: 'app-twitch-video',
  templateUrl: './twitch-video.component.html',
  styleUrls: ['./twitch-video.component.scss']
})
export class TwitchVideoComponent implements OnInit {
  constructor() { 
  }

  player: any;
  @Input() currentTurnName: any;
  previousTurnName: any;
  ngOnInit(): void {

      var options = {
        width: 1080,
        height: 650,
        channel: this.currentTurnName,
      };
      this.player = new Twitch.Player("<player div ID>", options)
      this.player.setVolume(0.5);
      this.player.setChannel(this.currentTurnName);
      console.log(this.currentTurnName);
  }

}
