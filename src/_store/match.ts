import {Action, Module, Mutation} from "vuex-module-decorators";
import CrudModule from "@/_store/crudModule";
import Match, {MatchsByDay, MatchsCompetitionResponseDto} from "@/_models/Match";
import MatchService from "@/_services/match.service";

@Module({namespaced: true})
class MatchModule extends CrudModule<Match> {

    public loader = false;

    @Mutation
    setLoader(loader: boolean) {
        this.loader = loader;
    }

    @Action
    async retrieveAllByCompetition(idCompetition: string): Promise<MatchsCompetitionResponseDto> {
        this.context.commit('setLoader', true);
        const response: MatchsCompetitionResponseDto = await MatchService.retrieveAllByCompetition(idCompetition);
        this.context.commit('setLoader', false);
        return response;
    }

    get getLoader(): boolean {
        return this.loader;
    }

}
export default MatchModule;