import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import JwtResponse from "@/_models/_response/JwtResponse";
import SigninRequest from "@/_models/_requests/SigninRequest";
import router from "@/router";
import {AuthService} from "@/_services/auth.service";

@Module({ namespaced: true })
class AuthModule extends VuexModule {

    public currentUser!: JwtResponse;

    @Mutation
    setCurrentUser(jwtResponse: JwtResponse) {
        this.currentUser = jwtResponse;
    }

    @Mutation
    resetCurrentUser(): void {
        this.currentUser = new JwtResponse();
    }

    @Action
    async signin(signinRequest: SigninRequest): Promise<boolean> {
        const jwtResponse = await AuthService.signin(signinRequest);
        if (jwtResponse) {
            this.context.commit('setCurrentUser', jwtResponse);
            localStorage.setItem('user', JSON.stringify(jwtResponse));
            return true;
        } else {
            return false;
        }
    }

    @Action
    logout(): void {
        this.context.commit('resetCurrentUser');
        localStorage.removeItem('user');
        router.push({name: 'login'});
    }

    get getCurrentUser(): JwtResponse  {
        return this.currentUser;
    }

    get getAccessToken(): string {
        return this.currentUser.token;
    }

    get isAdmin(): boolean {
        return this.currentUser.roles.includes('ROLE_ADMIN');
    }

    get isUserLoggedIn(): boolean {
        const user = localStorage.getItem('user');
        return !!this.currentUser && !!this.currentUser.id && !!user;
    }

}
export default AuthModule;