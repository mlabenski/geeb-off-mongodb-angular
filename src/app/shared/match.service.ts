import {Match} from '../models/match.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';


@Injectable()
export class MatchService {
    constructor(private httpService: HttpClient) {}

    public getMatch(matchID: number): Observable<Match> {
        return this.httpService.get<Match>(`http://localhost:3000/match/${matchID}`).pipe(
        map(data => new Match().deserialize(data))
        );
    }

    public getAllMatches(): Observable<Match[]> {
        return this.httpService.get<Match[]>(`http://localhost:3000/matches/`).pipe(
            map(data => data.map(data=> new Match().deserialize(data)))
        );
    }


}