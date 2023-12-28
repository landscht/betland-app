import {Action, Module, Mutation} from "vuex-module-decorators";
import Competition from "@/_models/Competition";
import CrudModule from "@/_store/crudModule";
import CompetitionService from "@/_services/competition.service";

@Module({namespaced: true})
class CompetitionModule extends CrudModule<Competition> {

    public currentCompetition!: Competition;

    @Mutation
    setCurrentCompetition(competition: Competition) {
        this.currentCompetition = competition;
    }

    @Action
    async retrieveCompetitionById(idCompetition: string): Promise<Competition> {
        const response: Competition = await CompetitionService.retrieveCompetitionById(idCompetition);
        this.context.commit('setCurrentCompetition', response);
        return response;
    }

    get getCurrentCompetition(): Competition {
        return this.currentCompetition;
    }

}
export default CompetitionModule;