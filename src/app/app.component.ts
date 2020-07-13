import { Component, OnInit, Input } from '@angular/core';
import { Subscription} from 'rxjs';
import { UsersService } from "./shared/users.service";
import { FormBuilder} from '@angular/forms';
import { AngularFireDatabase } from "@angular/fire/database";
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  subscription: Subscription;
  username = 'RuptureXX'
  channelSelected:string;
  @Input() startBoolean: boolean;

  constructor(private usersService:UsersService, private formBuilder: FormBuilder, private af: AngularFireDatabase) {
    this.channelSelected = "RuptureXX";
  }

  ngOnInit() {
  }

}
