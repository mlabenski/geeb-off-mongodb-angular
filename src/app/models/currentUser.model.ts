export class CurrentUser {
    round: boolean;
    timeJoined:number;
    user: string;
    failed: boolean;
    votes: number;


    public CurrentUser(user, timeJoined, round, failed, votes) {
        this.user = user;
        this.timeJoined = timeJoined;
        this.round = round;
        this.failed = failed;
        this.votes= votes;
    }
}