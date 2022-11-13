import {Profile} from "@/_models/profile/Profile";
import axiosInstance from "@/_services/axiosInstance";

export class UserService {

    public static currentProfile: Profile;

    static async getCurrentUserProfile(): Promise<Profile> {
        const response = await axiosInstance.get<Profile>(`https://api.spotify.com/v1/me`);
        this.currentProfile = response.data;
        return response.data;
    }

}