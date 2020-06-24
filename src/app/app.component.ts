import { Component, OnInit, Input } from '@angular/core';
import { User } from './models/user.model';
import { interval, Subscription, timer, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UsersService } from "./shared/users.service";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase } from "@angular/fire/database";

import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  subscription: Subscription;
  username = 'RuptureXX'
  channelSelected:string;
  statusText: string;
  currentGeeber: any;
  @Input() startBoolean: boolean;
  items: Observable<any[]>;
  signupForm: FormGroup;
  data$: any;

  constructor(private usersService:UsersService, private formBuilder: FormBuilder, private af: AngularFireDatabase) {
    this.channelSelected = "RuptureXX";
  }
  private initForm(){
    this.signupForm = new FormGroup({
        'channelName' : new FormControl('', Validators.required),
    });
}
  ngOnInit() {
    this.getUsers();
    this.initForm();
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

 

  onSubmit() {
    // Process checkout data here
    User
    this.usersService.createUser(this.signupForm.value);
    console.warn('A new geeber has been submitted', this.signupForm.value);
    this.signupForm.reset();
  }
  onSubmitCloudFunction() {
    const name = this.signupForm.value;
    const date = new Date();
    const time = date.getMinutes();

    let formRequest = { name, time };

    this.af.database.ref('queue').push(formRequest);
    this.signupForm.reset();
  }
}
