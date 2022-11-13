import Competition from "@/_models/Competition";
import {Api} from "@/_services/api";
import axiosInstance from "@/_services/axiosInstance";
import Team from "@/_models/Team";

export default class TeamService {

    static async retrieveTeams(): Promise<Team[]> {
        const url = `${Api.URL}api/team`;
        const response = await axiosInstance.get<Team[]>(url);
        return response.data;
    }

    static async createTeam(team: Team): Promise<Team> {
        const url = `${Api.URL}api/team`;
        const response = await axiosInstance.post<Team>(url, team);
        return response.data;
    }

    static async deleteTeam(idTeam: string): Promise<boolean> {
        const url = `${Api.URL}api/team/${idTeam}`;
        const response = await axiosInstance.delete(url);
        return response.status === 200;
    }

}