import Vuex from 'vuex'
import Vue from "vue";
import AuthModule from "@/_store/auth";
import CompetitionModule from "@/_store/competition";
import TeamModule from "@/_store/team";
import MatchCategoryModule from "@/_store/matchCategory";
import MatchModule from "@/_store/match";
import BetModule from "@/_store/bet";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        AuthModule,
        CompetitionModule,
        TeamModule,
        MatchCategoryModule,
        MatchModule,
        BetModule
    }
});