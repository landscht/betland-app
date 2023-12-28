import Match, {MatchsByDay, MatchsCompetitionResponseDto} from "@/_models/Match";
import axiosInstance from "@/_services/axiosInstance";
import {Api} from "@/_services/api";

export default class MatchService {

    static async retrieveAllByCompetition(idCompetition: string): Promise<MatchsCompetitionResponseDto> {
        const url = `${Api.URL}api/match/competition/${idCompetition}`;
        const response = await axiosInstance.get<MatchsCompetitionResponseDto>(url);
        return response.data;
    }

}