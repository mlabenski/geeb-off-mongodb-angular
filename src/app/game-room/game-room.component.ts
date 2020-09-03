import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TwitchVideoComponent } from '../twitch-video/twitch-video.component';
import { UsersService } from '../shared/users.service';
import { Observable, fromEventPattern } from 'rxjs';
import { User } from '../models/user.model';
import { CurrentUser } from '../models/currentUser.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { tap } from 'rxjs/operators';
import { TimerComponent } from '../timer/timer.component';
import { VoteBarComponent } from '../vote-bar/vote-bar.component';
@Component({
  selector: 'app-game-room',
  templateUrl: './game-room.component.html',
  styleUrls: ['./game-room.component.scss']
})
export class GameRoomComponent implements OnInit {
  public  users$: Observable<User[]>
  currentUser$: Observable<CurrentUser[]>;

  constructor(private usersService: UsersService, private afs: AngularFirestore) { 
    this.currentTurn = afs.collection<CurrentUser>('currentPlayerDB').valueChanges().pipe(
    tap(res => {
    this.currentTurnName = res
    this.currentTurnName = this.currentTurnName[0].user;
    console.log(this.currentTurn);
    })
    ).subscribe();
  }
  currentTurn: any;
  items: any;
  currentTurnName : any;
  currentRoundNumber: any;
  currentNumberOfVotes: any;
  previousTurn: any;
  progress = 30;
  VoteCounter: any;
  totalVotes: any;
  progressColor = 'green'
  remainingProgressColor = 'red';
  timer = 70;
  timerColor = 'gray'
  remainingTimerColor = 'white';

  ngOnInit() {
    this.onPopulateUsers();
    this.findCurrentUser();
  }
ngOnChanges(changes: SimpleChanges) {
 if (this.currentTurnName) {
   this.currentRoundNumber++;
   }
 }

 voted = id => 
    this.usersService.updateVotes(id);

 failed(id) {
   this.usersService.failedVotes(id);
 }
  onPopulateUsers() {
    this.users$ = this.usersService
    .populateUserObject();
  }
  findCurrentUser() {
    this.currentUser$ = this.usersService.populateCurrentUser();
  }
}
