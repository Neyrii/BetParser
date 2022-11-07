import { Actor } from "./Actor.js";
import { Player } from "./Player.js";

export class Team extends Actor{
    protected _nbPlayers : number;
    protected _players : Player[];

    get nbPlayers(){
        return this._nbPlayers;
    }

    get players(){
        return this._players;
    }

    constructor(name: string, odd: number, nbPlayers: number, players: Player[] = []){
        super(name, odd)
        this._nbPlayers = nbPlayers;
        this._players = players;
    }
}