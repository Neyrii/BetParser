import { Match } from './Match.js';
import { SportEnum } from '../sports/Sport.js';
import { Status } from './Status.js';
import { Team } from '../actors/Team.js';
import { DrawTeam } from '../actors/DrawTeam.js';
import { FootBallTeam } from '../actors/FootballTeam.js';

export class FootballMatch extends Match{
    constructor(_teams: [Team, DrawTeam, Team], status: Status){
        super(SportEnum.Footbal, status, _teams);
    }
}