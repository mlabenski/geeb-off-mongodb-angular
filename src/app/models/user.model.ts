export class User {
    round: boolean;
    timeJoined:number;
    user: string;
    failed: boolean;


    public User(user, timeJoined, round, failed) {
        this.user = user;
        this.timeJoined = timeJoined;
        this.round = round;
        this.failed = failed;
    }
}