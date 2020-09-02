import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TwitchVideoComponent } from '../twitch-video/twitch-video.component';
import { UsersService } from '../shared/users.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { CurrentUser } from '../models/currentUser.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { tap } from 'rxjs/operators';
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
    this.VoteCounter = res;
    this.VoteCounter = this.VoteCounter[0].votes;
    console.log(this.currentTurnName);
    console.log(this.VoteCounter);
    })
    ).subscribe();
  }
  currentTurn: any;
  items: any;
  currentTurnName : any;
  currentRoundNumber: any;
  previousTurn: any;
  progress = 30;
  VoteCounter: any;
  progressColor = 'green'
  remainingProgressColor = 'red';

  ngOnInit() {
    this.onPopulateUsers();
    this.findCurrentUser();
  }
ngOnChanges(changes: SimpleChanges) {
 if (this.currentTurnName) {
   this.currentRoundNumber++;
   }
 }
 voteChangedHandler(vote: number) {
   if (this.VoteCounter > 0 ) {
    this.VoteCounter = this.VoteCounter+vote;
   }
   else {
     this.VoteCounter = 0 + vote;
   }
  console.log(this.VoteCounter);
 }
  onPopulateUsers() {
    this.users$ = this.usersService
    .populateUserObject();
  }
  findCurrentUser() {
    this.currentUser$ = this.usersService.populateCurrentUser();
  }
}
