<template>
  <div>
    <vs-card style="width: 100px" v-if="match" class="">
      <template #title>
        <div style="display: flex; justify-content: space-evenly; align-items: center">
          <logo-info :url="match.homeTeam.isoCountry | getFlag" :flag="match.homeTeam.flag" :alt="match.homeTeam.name" :info="match.homeTeam.name" />
          <span class="txt-score">{{ match.finished ? match.homeScore : '-' }}</span>
          <span class="txt-score">{{ match.finished ? match.awayScore : '-' }}</span>
          <logo-info :url="match.awayTeam.isoCountry | getFlag" :flag="match.awayTeam.flag" :alt="match.awayTeam.name" :info="match.awayTeam.name" />
        </div>
      </template>
      <template #text>
        <bet-alert :match="match" v-on="$listeners" />
        <div style="display: flex; justify-content: space-between; width: 100%; margin-top: 20px;">
          <span style="font-size: 12px; color: gray">{{ match.matchCategory.name }} • {{ match.date | formatTime }} • {{ match.bets.length }} paris</span>
          <vs-button danger gradient style="margin-bottom: -10px" @click="dialogDetails = true">Voir tous les paris</vs-button>
        </div>
      </template>
    </vs-card>
    <vs-dialog scroll overflow-hidden auto-width width="550px" blur v-model="dialogDetails">
      <match-details-dialog :match="match" v-on="$listeners" />
    </vs-dialog>
  </div>
</template>

<script lang="ts">

import {Component, Prop, Vue} from "vue-property-decorator";
import Match from "@/_models/Match";
import LogoInfo from "@/components/LogoInfo.vue";
import {namespace} from "vuex-class";
import MatchDetailsDialog from "@/components/MatchDetailsDialog.vue";
import BetAlert from "@/components/BetAlert.vue";

@Component({
  components: {BetAlert, MatchDetailsDialog, LogoInfo}
})
export default class CardMatchBet extends Vue {

  public dialogDetails = false;

  @Prop({ type: Object }) match!: Match;


}
</script>

<style scoped>

::v-deep .vs-card__text {
  padding-bottom: 0 !important;
}

::v-deep .vs-dialog__content {
  max-height: calc(80vh - 50px) !important;
}

</style>