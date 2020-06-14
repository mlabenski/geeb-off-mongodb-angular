import { Component, OnInit, ElementRef, ViewChild, Input, SimpleChanges } from '@angular/core';
import { parseLazyRoute } from '@angular/compiler/src/aot/lazy_routes';

@Component({
  selector: 'app-twitch-video',
  templateUrl: './twitch-video.component.html',
  styleUrls: ['./twitch-video.component.scss']
})
export class TwitchVideoComponent implements OnInit {
  constructor() { }
  channels = ["rupturexx", "bob ross"]
  player: any;
  @Input() channelSelected: string;

  ngOnInit(): void {
    var options = {
      width: 1080,
      height: 720,
      channel: "rupturexx",
    };
    this.player = new Twitch.Player("<player div ID>", options)
    this.player.setVolume(0.5);
  }
  ngOnChanges(changes: SimpleChanges) {
    if(this.channelSelected != null){
      this.player.setChannel(this.channelSelected);
    }
  }
}
