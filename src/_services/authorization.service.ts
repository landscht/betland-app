import {Authorization} from "@/_models/Authorization";
import {RequestAccessToken} from "@/_models/_requests/RequestAccessToken";
import axios from "axios";

export class AuthorizationService {

    public static currentAuthorization: Authorization = new Authorization();

    private static CLIENT_ID = "2ca3fec28207496485a8a30d921e4f36";
    private static CLIENT_SECRET = "c2cd299d136a4b99a578631201d29cb5";

    private static BASIC_AUTH_64 = btoa(`${this.CLIENT_ID}:${this.CLIENT_SECRET}`);

    static async logout(): Promise<void> {
        this.currentAuthorization = new Authorization();
    }


    static async getToken(body: RequestAccessToken): Promise<Authorization> {
        const response = await axios.post<Authorization>(`https://accounts.spotify.com/api/token`, new URLSearchParams({
            ...body
        }), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Basic ${this.BASIC_AUTH_64}`
            }
        });
        this.currentAuthorization = response.data;
        return response.data;
    }

}