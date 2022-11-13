import {Action, Module} from "vuex-module-decorators";
import CrudModule from "@/_store/crudModule";
import Match, {MatchsByDay} from "@/_models/Match";
import MatchService from "@/_services/match.service";

@Module({namespaced: true})
class MatchModule extends CrudModule<Match> {

    @Action
    async retrieveAllByCompetition(idCompetition: string): Promise<MatchsByDay[]> {
        return MatchService.retrieveAllByCompetition(idCompetition);
    }

}
export default MatchModule;