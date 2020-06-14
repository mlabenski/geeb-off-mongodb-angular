import { Component, OnInit, Input } from '@angular/core';
import { User } from './models/user.model';
import { interval, Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UsersService } from "./shared/users.service";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  subscription: Subscription;
  username = 'RuptureXX'
  channelSelected:string;
  statusText: string;
  currentGeeber: any;
  @Input() startBoolean: boolean;

  signupForm: FormGroup;

  constructor(private usersService:UsersService, private formBuilder: FormBuilder) {
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
}
