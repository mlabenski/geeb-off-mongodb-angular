import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user.model';
import { CurrentUser } from '../models/currentUser.model';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users$: Observable<User[]>;
  currentUser: Observable<CurrentUser[]>;

  constructor(private firestore: AngularFirestore) {
   }
   getUsers() {
    return this.firestore.collection("queue").snapshotChanges();
  }

    populateUserObject() {
      this.users$ = this.firestore.collection<User>("match")
      .valueChanges()
      .pipe(map(collection => {
        return collection.map(u => {
          let user = new User();
          user.user = u.user;
          user.failed = u.failed;
          user.timeJoined = u.timeJoined;
          user.round = u.round;
          return user;
        });
      }));
      return this.users$;
    }
    populateCurrentUser() {
      this.currentUser = this.firestore.collection<CurrentUser>("currentPlayerDB")
      .valueChanges()
      .pipe(map(collection => {
        return collection.map(u => {
          let currentUser = new CurrentUser();
          currentUser.user = u.user;
          currentUser.failed = u.failed;
          currentUser.timeJoined = u.timeJoined;
          currentUser.round = u.round;
          return currentUser;
        });
      }));
      return this.currentUser;
    }
  getMatchedUsers() {
    return this.firestore.collection("match").snapshotChanges();
  }
  getCurrentUser() {
    return this.firestore.collection("currentPlayerDB").snapshotChanges();
  }
  getUnmatchedPlayers() {
    return this.firestore.collection("Queue", ref => ref.where('queued', '==', 'false'))
  }
  getQueuedPlayers() {
    return this.firestore.collection("Queue", ref => ref.where('queued', '==', 'true')).snapshotChanges();
  }

  createUser(user: User){
    return this.firestore.collection('Queue').add(user);
}

}
