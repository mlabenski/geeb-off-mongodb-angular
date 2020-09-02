export class CurrentUser {
    round: boolean;
    timeJoined:number;
    user: string;
    failed: boolean;


    public CurrentUser(user, timeJoined, round, failed) {
        this.user = user;
        this.timeJoined = timeJoined;
        this.round = round;
        this.failed = failed;
    }
}