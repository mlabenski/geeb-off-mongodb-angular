import { Component, OnInit, HostBinding, Input, EventEmitter, Output } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  useAnimation,
  animation,
  keyframes,

} from '@angular/animations';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';

export const pulseAnimation = animation([
  style({ transform: 'scale(1)' }),
  animate(
    '{{ timings }}',
    keyframes([
      style({ transform: 'scale(1)', offset: 0 }),
      style({ transform: 'scale({{ scale }})', offset: 0.5 }),
      style({ transform: 'scale(1)', offset: 1 })
    ])
  )
]);

@Component({
  selector: 'app-favicon-animation',
  template: `<button (click)="increment()"><fa-icon [icon]="thumbsUp" [class.clicked]="clicked"></fa-icon></button>
             `,
  styleUrls: ['./favicon-animation.component.scss'],
  animations: [
    trigger('counterChange', [
      transition(
        ':increment',
        useAnimation(pulseAnimation, {
          params: {
            timings: '400ms cubic-bezier(.11,.99,.83,.43)',
            scale: 1.05
          }
        })
      )
    ])
  ]
})
export class FaviconAnimationComponent{
  @Output() voteChanged: EventEmitter<number> = new EventEmitter();
  thumbsDownClicked: EventEmitter<number> = new EventEmitter()
  clicked = false;
  thumbsUp = faThumbsUp
  thumbsDown = faThumbsDown
  @Input() vote: number;

  increment() {
    this.clicked = !this.clicked;
    this.vote++;
    this.voteChanged.emit(this.vote);
  }
  
}

