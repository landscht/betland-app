import {PagePlaylists} from "@/_models/_playlist/PagePlaylists";
import axiosInstance from "@/_services/axiosInstance";
import {UserService} from "@/_services/user.service";

export class PlaylistService {

    static async getPlaylistsOfCurrentUser(): Promise<PagePlaylists> {
        const response = await axiosInstance.get<PagePlaylists>(`https://api.spotify.com/v1/users/${UserService.currentProfile.id}/playlists`);
        return response.data;
    }

}