import { Actor } from '../actors/Actor.js';
import { Match } from './Match.js';
import { SportEnum } from '../sports/Sport.js';
import { Status } from './Status.js';

export class TennisMatch extends Match{
    private _players: [Actor, Actor];

    get players(){
        return this._players;
    }

    constructor(_players: [Actor, Actor], status: Status){
        super(SportEnum.Tennis, status, _players);
        this._players = _players;
    }
}