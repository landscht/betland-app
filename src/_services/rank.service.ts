import Rank from "@/_models/Rank";
import {Api} from "@/_services/api";
import axiosInstance from "@/_services/axiosInstance";

export default class RankService {

    static async getStandingsByCompetition(idCompetition: string): Promise<Rank[]> {
        const url = `${Api.URL}api/rank/${idCompetition}`;
        const response = await axiosInstance.get<Rank[]>(url);
        return response.data;
    }

}