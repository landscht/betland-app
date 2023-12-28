import Bet, {ReactType} from "@/_models/Bet";
import {Api} from "@/_services/api";
import axiosInstance from "@/_services/axiosInstance";
import bet from "@/_store/bet";

export default class BetService {

    static async createBetForMatch(idMatch: string, bet: Bet): Promise<Bet> {
        const url = `${Api.URL}api/bet/match/${idMatch}`;
        const response = await axiosInstance.post<Bet>(url, bet);
        return response.data;
    }

    static async addReactForBet(idMatch: string, idUser: number, reactType: ReactType): Promise<Bet> {
        const url = `${Api.URL}api/bet/match/${idMatch}/user/${idUser}/addReact/${reactType}`;
        const response = await axiosInstance.post<Bet>(url);
        return response.data;
    }

    static async removeReactForBet(idMatch: string, idUser: number, reactType: ReactType): Promise<Bet> {
        const url = `${Api.URL}api/bet/match/${idMatch}/user/${idUser}/removeReact/${reactType}`;
        const response = await axiosInstance.post<Bet>(url);
        return response.data;
    }
}