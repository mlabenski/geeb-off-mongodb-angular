import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
@Component({
  selector: 'app-timer',
  template: `
  <div style="width:1080px;height:30px;" id="user.user"
  [ngStyle]="{'background':'linear-gradient(to right, '+timerColor+' '+timer+'%, '+remainingTimerColor+' '+timer+'%'}">
  </div>`
  ,
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  progress = 30;
  VoteCounter: any;
  progressColor = 'green'
  remainingProgressColor = 'red';
  timer = 0;
  timerColor = 'gray'
  remainingTimerColor = 'white';
  today : number;
  constructor() { }

  ngOnInit(): void {
    this.today = Date.now();
    this.changeTimerBar();
  }

  changeTimerBar() {
    const subscription = interval(1200)
    .subscribe(() => {
      var date = new Date;
      var minutes = date.getMinutes();
      var seconds = date.getSeconds();
      if ((minutes === 0 || minutes === 2 || minutes === 4 || minutes === 6 || minutes === 8) && seconds === 0) {
        this.timer==0;
      }
      else {
        this.timer+=1.2;
        if(this.timer >= 99) {
          this.timer ==0;
        }
      }
    })
  }

}
