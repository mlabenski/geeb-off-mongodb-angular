import { Component, OnInit, Input, Output } from '@angular/core';
import { VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-countdown',
  template: `<div class="text">{{ displayMinutes }} : {{displaySeconds}}</div>`,
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {
  public hasGameBegun: boolean;
  public now: Date = new Date();
  public minutes = this.now.getMinutes();
  public seconds = this.now.getSeconds();

  public displayMinutes: any;
  public displaySeconds: any;

  @Output() startBoolean: boolean;

  constructor() {
    
    setInterval(() => {
      this.now = new Date();
      this.minutes = this.now.getMinutes();
      this.seconds = this.now.getSeconds();
      if((this.minutes == 30 && this.seconds == 0) || (this.minutes == 0 && this.seconds == 0)) {
        this.startBoolean = true;
      }
      this.theTimeIs()
    } ,1000);
   }
  

  ngOnInit(): void {
  }
  theTimeIs() {
    // The 11:30.01 + timer...
    if (this.minutes > 30) {
      if (this.minutes > 50 || this.minutes < 60){
        this.displaySeconds = "0"+(60-this.minutes);
      } 
      this.displayMinutes = (59-this.minutes);
    }
    // The 11:00-11:30 timer
    if(this.minutes < 30) {
      if(this.minutes >= 29){
        this.displayMinutes = "00"
      }
      if (this.minutes > 20){
        this.displayMinutes = "0"+(29-this.minutes);
      } 
      this.displayMinutes = (29-this.minutes);
    }

    this.displaySeconds = (60-this.seconds);
    if (this.displaySeconds < 10) {
      this.displaySeconds = "0"+ this.displaySeconds;
    }
  }
}



