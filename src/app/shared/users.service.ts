import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private firestore: AngularFirestore) {
   }
   getUsers() {
    return this.firestore.collection("Queue").snapshotChanges();
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
