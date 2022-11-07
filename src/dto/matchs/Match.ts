import { Actor } from "../actors/Actor.js";
import { SportEnum } from "../sports/Sport.js";

import { Status } from "./Status.js"

export abstract class Match {
    private _sport: SportEnum;
    private _status: Status;
    private _actors: Actor[];

    get sport(){
        return this._sport;
    }

    get actors(){
        return this._actors;
    }

    get status(){
        return this._status
    }

    constructor(sport: SportEnum, status: Status, actors: Actor[]){
        this._sport = sport;
        this._status = status;
        this._actors = actors;
    }

    public toString = () : string => {
        let str = '[ - '
        for (let actor of this.actors){
            str += actor.toString() + ' - ';
        }
        str += '] -> ' + this.status;
        return str;
    }
}