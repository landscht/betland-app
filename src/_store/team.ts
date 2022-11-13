import {Module} from "vuex-module-decorators";
import Team from "@/_models/Team";
import CrudModule from "@/_store/crudModule";

@Module({namespaced: true})
class TeamModule extends CrudModule<Team> {

}
export default TeamModule;