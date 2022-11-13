import {Api} from "@/_services/api";
import Competition from "@/_models/Competition";
import axiosInstance from "@/_services/axiosInstance";

export default class CompetitionService {

    static async retrieveCompetitionById(idCompetition: string): Promise<Competition> {
        const url = `${Api.URL}api/competition/${idCompetition}`;
        const response = await axiosInstance.get<Competition>(url);
        return response.data;
    }

}