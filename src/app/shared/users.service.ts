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
          user.votes = u.votes;
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
          currentUser.votes = u.votes;
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
  setVoteCount(_user: string, _value: number) {
    let doc = this.firestore.collection("currentPlayerDB", ref => ref.where('user', '==', _user));
    doc.snapshotChanges().subscribe((res: any) => {
      let id = res[0].payload.doc.id;
      console.log("the # of votes are "+_value);
      _value = _value +1;
      this.firestore.collection('currentPlayerDB').doc(id).update({votes: _value});
    }).unsubscribe();
  }

 updateVotes(id) {
  return this.firestore
    .collection("currentPlayerDB")
    .doc(id)
    .set({ votes: 1 }, {merge: true});
}

failedVotes(id) {
  return this.firestore
    .collection("currentPlayerDB")
    .doc(id)
    .set({ votes: -1 }, {merge: true});
}

  getQueuedPlayers() {
    return this.firestore.collection("Queue", ref => ref.where('queued', '==', 'true')).snapshotChanges();
  }

  createUser(user: User){
    return this.firestore.collection('Queue').add(user);
}
}
