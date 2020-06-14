import { Component, OnInit, Input } from '@angular/core';
import { User } from '../models/user.model';
import { interval, Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UsersService } from "../shared/users.service";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CountdownComponent } from '../countdown/countdown.component';
import { Router } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
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


  constructor(private usersService:UsersService, private formBuilder: FormBuilder, private router: Router, private httpService: HttpClient) {
    
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

 

  onSubmit() {
    var formData: any = new FormData();
    formData.append("channelName", this.form.get('channelName').value);
    formData.append("queued", true);
    this.httpService.post('http://localhost:3000/create-user', formData).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )
  }
  onClick() {
    this.router.navigate(['/game-lobby']);
  }
}
