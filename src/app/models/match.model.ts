
import { User } from './user.model';
import { Deserializable } from '../shared/deserializeable.model';

export class Match implements Deserializable {
  matchID: number;
  roundNumber: number;
  currentUser: string;
  users: User[];

  deserialize(input: any): this {
    //Assign input to our object before deserialize our users to prevent already deserilized users from being overwritten.
    Object.assign(this, input);

    //iterate over all users for our match and map them to a proper User model
    this.users = input.users.map(user => new User().deserialize(user));

    return this;
  }
}