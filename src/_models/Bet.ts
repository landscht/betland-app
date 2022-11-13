import Match from "@/_models/Match";
import User from "@/_models/User";

export default class Bet {
    idUnique!: string;
    user: User = new User();
    updateDate = '';
    homeScore = '';
    awayScore = '';
    reactWow: User[] = [];
    reactFunny: User[] = [];
    reactGood: User[] = [];
    likedWow = false;
    likedGood = false;
    likedFunny = false;
}

export enum ReactType {
    FUNNY = 'FUNNY',
    WOW = 'WOW',
    LIKE = 'LIKE'
}