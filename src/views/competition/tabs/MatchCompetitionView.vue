<template>
  <div>
    <div v-for="(matchsByDay, i) in matchs" :key="i">
      <h2>{{ matchsByDay.date | formatDate }}</h2>
      <vs-card-group>
        <card-match-bet v-for="(match, i) in matchsByDay.matchs" :key="i" :match="match">
        </card-match-bet>
      </vs-card-group>
    </div>
  </div>
</template>

<script lang="ts">

import {Component, Vue} from "vue-property-decorator";
import {namespace} from "vuex-class";
import Match, {MatchsByDay} from "@/_models/Match";
import LogoInfo from "@/components/LogoInfo.vue";
import CardMatchBet from "@/components/CardMatchBet.vue";

const matchModule = namespace('MatchModule');
@Component({
  components: {CardMatchBet, LogoInfo}
})
export default class MatchCompetitionView extends Vue {

  public matchs: MatchsByDay[] = [];

  @matchModule.Action
  public retrieveAllByCompetition!: (idCompetition: string) => Promise<MatchsByDay[]>;

  async mounted(): Promise<void> {
    this.matchs = await this.retrieveAllByCompetition(this.$route.params.id);
  }

}
</script>

<style scoped>



</style>