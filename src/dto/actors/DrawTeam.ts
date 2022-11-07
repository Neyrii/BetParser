import { Team } from "./Team.js";

export class DrawTeam extends Team {
    constructor(odd: number){
        super("Draw", odd, 0)
    }
}