import * as Module from "module";

export class Authorization {

    access_token!: string;
    token_type!: string;
    scope!: string;
    expires_in!: number;
    refresh_token!: string;

}