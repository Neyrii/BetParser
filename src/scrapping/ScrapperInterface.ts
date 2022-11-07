import { cheerio_fetch } from '../utils.js';
import { TennisMatch } from '../dto/matchs/TennisMatch.js'
import { SportEnum } from '../dto/sports/Sport.js';


export abstract class Scrapper{
    public baseUrl: string;
    public sportsUrI: { [sport in SportEnum]?: string; }

    protected async getHtmlBody(sport: SportEnum){
        let fullUrl =  this.baseUrl + this.sportsUrI[sport];
        return cheerio_fetch(fullUrl);
    }
    
    abstract getTennisMatches(): Promise <TennisMatch[]>;


    constructor(baseUrl: string){
        this.baseUrl = baseUrl;
        this.sportsUrI = {};
    }
}