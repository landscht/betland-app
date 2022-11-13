import {SignupRequest} from "@/_models/_requests/SignupRequest";
import {Api} from "@/_services/api";
import axios from "axios";
import SigninRequest from "@/_models/_requests/SigninRequest";
import JwtResponse from "@/_models/_response/JwtResponse";

export class AuthService {

    static async signup(signupRequest: SignupRequest): Promise<boolean> {
        const url = `${Api.URL}api/auth/signup`;
        try {
            await axios.post<string>(url, signupRequest);
            return true;
        }catch (e) {
            return false;
        }
    }

    static async signin(signinRequest: SigninRequest): Promise<JwtResponse | undefined> {
        const url = `${Api.URL}api/auth/signin`;
        try {
            const response = await axios.post<JwtResponse>(url, signinRequest);
            return response.data;
        } catch (e) {
            return undefined;
        }
    }

}