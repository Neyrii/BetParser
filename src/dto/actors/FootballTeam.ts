import { Player } from "./Player.js";
import { Team } from "./Team.js";

export class FootBallTeam extends Team{
    constructor(name: string, odd: number){
        super(name, odd, 11)
    }
}