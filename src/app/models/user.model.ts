import { Deserializable } from '../shared/deserializeable.model';

export class User implements Deserializable{
    started: boolean;
    timeJoined:number;
    user: string;

    deserialize(input: any): this {
        return Object.assign(this, input);
    }
}