import { Component, OnInit, Input } from '@angular/core';
import { User } from '../models/user.model';
import { interval, Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UsersService } from "../shared/users.service";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CountdownComponent } from '../countdown/countdown.component';
import { Router } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AngularFireFunctions } from '@angular/fire/functions';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../notification.service'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
})

export class LobbyComponent implements OnInit {
  subscription: Subscription;
  username = 'RuptureXX'
  channelSelected:string;
  statusText: string;
  currentGeeber: any;
  @Input() startBoolean: boolean;
  form: FormGroup;
  submittedUsername = '';
  queuedUsers: any;
  matchedUsers: any;
  users$: Observable<User[]>
  show: boolean;
  inputDisplay: boolean;
  usernameSubmissionChange: any;


  constructor(private usersService:UsersService, private formBuilder: FormBuilder, private router: Router, private httpService: HttpClient
    , private functions: AngularFireFunctions, private notifyService : NotificationService) {
      this.inputDisplay = false;
    
    this.form = this.formBuilder.group({
      channelName: [''],
      queued: [null]
    })
  }
  ngOnInit() {
    this.getUsers();
    this.getMatchedUsers();
    console.log(this.queuedUsers);
    console.log(this.matchedUsers);
    this.show = false;
  }


  changeChannel(username) {
    this.channelSelected = username;
    console.log(this.channelSelected);
  }

  getUsers= () =>
    this.usersService
      .getUsers()
      .subscribe(res => { this.queuedUsers= res; console.log(this.queuedUsers)});

  getMatchedUsers= () =>
    this.usersService
      .getMatchedUsers()
      .subscribe(res => { this.matchedUsers= res; console.log(this.matchedUsers)});

  onGameRoomClick() {
    this.router.navigate(['/game-room']);
  }

  onPopulateUsersClick() {
    this.show = true;
    this.users$ = this.usersService
    .populateUserObject();

    for(let user in this.users$) {
      console.log(user);
    }
  }
  checkDirty(value) {
    if (value.dirty) {
      this.usernameSubmissionChange = true;
    }
  }


  callCloudFunction() {
    var addUser = this.functions.httpsCallable('request');
    addUser({user: this.submittedUsername}).toPromise()
    .then((res) =>{
      const alert = this.notifyService.showSuccess(res.user, "User added:");
    })
    .catch(err => {
      console.log(err);
    })
    //obs.subscribe({next(res) { console.log('got value' + res)}, error(err) { console.error('Something wrong occured')}, complete() { console.log('done')}});
    }
}

//obs.subscribe(async res => {
  //const alert = await this.notifyService.showSuccess(res.msg, "big message");
//});
