import {Action, Module, VuexModule} from "vuex-module-decorators";
import Bet from "@/_models/Bet";
import BetService from "@/_services/bet.service";

@Module({namespaced: true})
class BetModule extends VuexModule {

    @Action
    async createBetForMatch(idMatch: string, bet: Bet): Promise<Bet> {
        return await BetService.createBetForMatch(idMatch, bet);
    }

}
export default BetModule;