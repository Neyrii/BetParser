import { TennisMatch } from "../dto/matchs/TennisMatch.js";
import { SportEnum } from "../dto/sports/Sport.js";
import { Scrapper } from "../scrapping/ScrapperInterface.js";
import { Actor } from "../dto/actors/Actor.js";
import { Status } from "../dto/matchs/Status.js";
import { FootballMatch } from "../dto/matchs/FootballMatch.js";
import { Team } from "../dto/actors/Team.js";
import { FootBallTeam } from "../dto/actors/FootballTeam.js";
import { DrawTeam } from "../dto/actors/DrawTeam.js";

export class WinamaxScrapper extends Scrapper{
    constructor(){
        super("https://www.winamax.fr/en/sports-betting/sports/");
        this.sportsUrI[SportEnum.Tennis] = "5"
        this.sportsUrI[SportEnum.Footbal] = "1"
    }

    // From a sport, get the full jsonObjectMatch which is a complex object created by Winamax that contains every information about every match
    // On every sport in winamax, it's the same line of code
    private async jsonObjectMatches(sport : SportEnum){
        let $ = await this.getHtmlBody(sport);
        return JSON.parse(JSON.parse(JSON.stringify($('script', '#page-content').get()[1].children[0].cloneNode())).data.slice(22, -1));
    }

    private get_status (match: any) : Status{
        switch(match.status){
            case ('LIVE'):
                return Status.LIVE
            case ('PREMATCH'):
                return Status.PREMATCH
            default:
                return Status.ENDED
        }
    }
    
    async getFootBallMatches(): Promise<FootballMatch[]>{
        let jsonObjectMatch = await this.jsonObjectMatches(SportEnum.Footbal);
        let res : FootballMatch[] = [];
        let get_status = this.get_status;
        Object.values(jsonObjectMatch.matches).forEach(function(match: any){
            if (match.mainBetId != null){
                let outcome1 = jsonObjectMatch.bets[match.mainBetId].outcomes[0]
                let nameT1 = jsonObjectMatch.outcomes[outcome1].label
                let oddT1 = jsonObjectMatch.odds[outcome1]

                let outcomeDraw = jsonObjectMatch.bets[match.mainBetId].outcomes[1]
                let oddDraw = jsonObjectMatch.odds[outcomeDraw];

                let outcome2 = jsonObjectMatch.bets[match.mainBetId].outcomes[2]
                let nameT2 = jsonObjectMatch.outcomes[outcome2].label
                let oddT2 = jsonObjectMatch.odds[outcome2];
                let status = get_status(match)

                res.push(new FootballMatch([new FootBallTeam(nameT1, oddT1), new DrawTeam(oddDraw), new FootBallTeam(nameT2, oddT2)], status))
            }
        })
        res.forEach((match: any) => console.log(match.toString()))
        return Promise.resolve([]);
    }

    async getTennisMatches(): Promise<TennisMatch[]> {
        let jsonTennisObjectMatch = await this.jsonObjectMatches(SportEnum.Tennis);
        let res : TennisMatch[] = [];
        let get_status = this.get_status
        Object.values(jsonTennisObjectMatch.matches).forEach(function(match: any){
                // To avoid cancelled matched
                if (match.mainBetId != null){
                    let outcome1 = jsonTennisObjectMatch.bets[match.mainBetId].outcomes[0]
                    let nameP1 = jsonTennisObjectMatch.outcomes[outcome1].label
                    let oddP1 = jsonTennisObjectMatch.odds[outcome1]
                    let outcome2 = jsonTennisObjectMatch.bets[match.mainBetId].outcomes[1]
                    let nameP2 = jsonTennisObjectMatch.outcomes[outcome2].label
                    let oddP2 = jsonTennisObjectMatch.odds[outcome2]

                    res.push(new TennisMatch([new Actor(nameP1, oddP1), new Actor(nameP2, oddP2)], get_status(match)));
                }
        })
        return Promise.resolve(res);
    }
}