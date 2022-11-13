import {Action, Module} from "vuex-module-decorators";
import Competition from "@/_models/Competition";
import CrudModule from "@/_store/crudModule";
import CompetitionService from "@/_services/competition.service";

@Module({namespaced: true})
class CompetitionModule extends CrudModule<Competition> {

    @Action
    async retrieveCompetitionById(idCompetition: string): Promise<Competition> {
        return await CompetitionService.retrieveCompetitionById(idCompetition);
    }

}
export default CompetitionModule;