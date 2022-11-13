import Entity from "@/_models/Entity";
import Team from "@/_models/Team";
import MatchCategory from "@/_models/MatchCategory";
import Bet from "@/_models/Bet";

export default class Match extends Entity {
    homeTeam: Team = new Team();
    awayTeam: Team = new Team();
    matchCategory: MatchCategory = new MatchCategory();
    bets: Bet[] = [];
    myBet: Bet = new Bet();
    homeScore = 0;
    awayScore = 0;
    description = '';
    finished = false;
    date!: string;
}

export class MatchsByDay {
    date!: string;
    matchs: Match[] = [];
}