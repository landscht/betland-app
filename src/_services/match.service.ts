import Match, {MatchsByDay} from "@/_models/Match";
import axiosInstance from "@/_services/axiosInstance";
import {Api} from "@/_services/api";

export default class MatchService {

    static async retrieveAllByCompetition(idCompetition: string): Promise<MatchsByDay[]> {
        const url = `${Api.URL}api/match/competition/${idCompetition}`;
        const response = await axiosInstance.get<MatchsByDay[]>(url);
        return response.data;
    }

}