import {Module} from "vuex-module-decorators";
import CrudModule from "@/_store/crudModule";
import Match from "@/_models/Match";
import MatchCategory from "@/_models/MatchCategory";

@Module({namespaced: true})
class MatchCategoryModule extends CrudModule<MatchCategory>{
    
}
export default MatchCategoryModule;