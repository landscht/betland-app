import Entity from "@/_models/Entity";
import Team from "@/_models/Team";
import MatchCategory from "@/_models/MatchCategory";
import Bet from "@/_models/Bet";
import Competition from "@/_models/Competition";

export default class Match extends Entity {
    homeTeam!: Team;
    awayTeam!: Team;
    competition!: Competition
    matchCategory!: MatchCategory;
    bets: Bet[] = [];
    myBet!: Bet;
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

export class MatchsCompetitionResponseDto {
    numberMatchs = 0;
    numberBets = 0;
    numberBetsWon = 0;
    numberBetsLost = 0;
    numberBetsSuperWin = 0;
    numberBetsPending = 0;
    bets: Bet[] = [];
    matchsByDay: MatchsByDay[] = [];
}