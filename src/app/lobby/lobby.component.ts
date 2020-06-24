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
import { resolve } from 'path';
@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
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


  constructor(private usersService:UsersService, private formBuilder: FormBuilder, private router: Router, private httpService: HttpClient
    , private functions: AngularFireFunctions, private toastr: ToastrService) {
    
    this.form = this.formBuilder.group({
      channelName: [''],
      queued: [null]
    })
  }
  ngOnInit() {
    this.getUsers();
  }
  users;

  changeChannel(username) {
    this.channelSelected = username;
    console.log(this.channelSelected);
  }

  getUsers= () =>
    this.usersService
      .getUsers()
      .subscribe(res => (this.users = res));

  getQueuedUsers= () =>
    this.usersService
      .getQueuedPlayers()
      .subscribe(res => (this.users = res));

  onClick() {
    this.router.navigate(['/game-lobby']);
  }
  callCloudFunction() {
    const callable = this.functions.httpsCallable('myUppercaseFunction');
    callable({coolMsg: this.submittedUsername}).subscribe(async result => {
      console.log(result.data);
    })
  }
}
