import { Deserializable } from '../shared/deserializeable.model';

export class User implements Deserializable{
    streamName:string;
    inQueue:boolean;

    deserialize(input: any): this {
        return Object.assign(this, input);
    }
}