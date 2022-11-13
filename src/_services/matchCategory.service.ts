import Competition from "@/_models/Competition";
import {Api} from "@/_services/api";
import axiosInstance from "@/_services/axiosInstance";

export default class MatchCategoryService {

    static async retrieveAll(): Promise<Competition[]> {
        const url = `${Api.URL}api/competition`;
        const response = await axiosInstance.get<Competition[]>(url);
        return response.data;
    }

    static async createCompetition(competition: Competition): Promise<Competition> {
        const url = `${Api.URL}api/competition`;
        const response = await axiosInstance.post<Competition>(url, competition);
        return response.data;
    }

    static async deleteCompetition(idCompetition: string): Promise<boolean> {
        const url = `${Api.URL}api/competition/${idCompetition}`;
        const response = await axiosInstance.delete(url);
        return response.status === 200;
    }

}