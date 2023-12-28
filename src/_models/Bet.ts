import Match from "@/_models/Match";
import User from "@/_models/User";

export default class Bet {
    idUnique!: string;
    user: User = new User();
    updateDate = '';
    homeScore = '';
    awayScore = '';
    status: BetStatus = BetStatus.PENDING;
    reactWow: User[] = [];
    reactFunny: User[] = [];
    reactGood: User[] = [];
    likedWow = false;
    likedGood = false;
    likedFunny = false;
}

export enum BetStatus {
    PENDING = 'PENDING',
    SUPER_WON = 'SUPER_WON',
    'WON' = 'WON',
    'LOST' = 'LOST',
}

export enum ReactType {
    FUNNY = 'FUNNY',
    WOW = 'WOW',
    LIKE = 'LIKE'
}