<template>
  <div v-if="!getLoader">
    <vs-button @click="scrollToNow" style="position: fixed; bottom: 10px; right: 10px; z-index: 999" circle icon floating>
      <i class='bx bx-calendar-alt'></i>
    </vs-button>
    <h2>Résumé</h2>
    <vs-card @click="dialogSummary = true">
      <template #title>
        <div style="display: flex; align-items: baseline">
          <h1 style="font-size: 40px; margin: 0">{{ matchs.numberMatchs }}</h1> matchs
          <hr style="height: 50px">
          <h1 style="font-size: 40px; margin: 0">{{ matchs.numberBets }}</h1> paris placés
        </div>
      </template>
      <template #text>
        <h3>Détails</h3>
        <p><b>{{ matchs.numberBetsSuperWin}}</b> super victoire ✨</p>
        <p><b>{{ matchs.numberBetsWon}}</b> victoire 👍</p>
        <p><b>{{ matchs.numberBetsLost}}</b> perdu 😢</p>
        <p><b>{{ matchs.numberBetsPending}}</b> en cours ⏳</p>
        <timeline :bets="matchs.bets" />
      </template>
    </vs-card>
    <div v-for="(matchsByDay, i) in matchs.matchsByDay" :key="i" :ref="matchsByDay.date">
      <h2 style="text-transform: capitalize">{{ matchsByDay.date | formatDate }}</h2>
      <vs-card-group>
        <card-match-bet v-for="(match, i) in matchsByDay.matchs" :key="i" :match="match" @create-bet="createBet($event)">
        </card-match-bet>
      </vs-card-group>
    </div>
    <vs-dialog scroll overflow-hidden auto-width width="550px" blur v-model="dialogSummary">
      <h3 style="margin-bottom: 0">{{ getCurrentCompetition ? getCurrentCompetition.name : '' }}</h3>
      <p style="margin-top: 0">Stats de <b>{{getCurrentUser.username}}</b></p>
      <div style="display: flex; align-items: baseline">
        <h1 style="font-size: 40px; margin: 0">{{ matchs.numberMatchs }}</h1> matchs
        <hr style="height: 50px">
        <h1 style="font-size: 40px; margin: 0">{{ matchs.numberBets }}</h1> paris placés
      </div>
      <h3>Détails</h3>
      <p><b>{{ matchs.numberBetsSuperWin}}</b> super victoire ✨</p>
      <p><b>{{ matchs.numberBetsWon}}</b> victoire 👍</p>
      <p><b>{{ matchs.numberBetsLost}}</b> perdu 😢</p>
      <p><b>{{ matchs.numberBetsPending}}</b> en cours ⏳</p>
      <timeline :bets="matchs.bets" />
    </vs-dialog>
  </div>
</template>

<script lang="ts">

import {Component, Vue, Watch} from "vue-property-decorator";
import {namespace} from "vuex-class";
import Match, {MatchsByDay, MatchsCompetitionResponseDto} from "@/_models/Match";
import LogoInfo from "@/components/LogoInfo.vue";
import CardMatchBet from "@/components/CardMatchBet.vue";
import Timeline from "@/components/Timeline.vue";
import Competition from "@/_models/Competition";
import JwtResponse from "@/_models/_response/JwtResponse";
import Bet from "@/_models/Bet";
import dayjs from "dayjs";

const matchModule = namespace('MatchModule');
const competitionModule = namespace('CompetitionModule');
const authModule = namespace('AuthModule');

@Component({
  components: {Timeline, CardMatchBet, LogoInfo}
})
export default class MatchCompetitionView extends Vue {

  public matchs: MatchsCompetitionResponseDto = new MatchsCompetitionResponseDto();
  public dialogSummary = false;
  public loading: any;

  @authModule.Getter
  public getCurrentUser!: JwtResponse;

  @competitionModule.Getter
  public getCurrentCompetition!: Competition;

  @matchModule.Action
  public retrieveAllByCompetition!: (idCompetition: string) => Promise<MatchsCompetitionResponseDto>;

  @matchModule.Getter
  public getLoader!: boolean;

  async mounted(): Promise<void> {
    this.matchs = await this.retrieveAllByCompetition(this.$route.params.id);
  }

  @Watch('getLoader')
  watchLoader() {

    if (this.getLoader) {
      this.loading = this.$vs.loading({
        type: 'circles',
        background: '#000000'
      })
    } else {
      this.loading.close();
    }
  }

  scrollToNow() {
    console.log(this.$refs);
    const now = dayjs().format('YYYY-MM-DD');
    console.log(now);
    const element: any = this.$refs[now];
    console.log(element[0]);
    if (element[0]) {
      window.scrollTo({left: 0, top: element[0].offsetTop, behavior: 'smooth'});
    }
  }

  createBet(bet: Bet): void {
    console.log(bet);
    if (bet.user) {
      this.matchs.bets.push(bet);
      this.matchs.numberBets++;
      this.matchs.numberBetsPending++;
    }
  }

  beforeDestroy() {
    this.loading.close();
  }

}
</script>

<style scoped lang="scss">

::v-deep .vs-card__group-prev {
  display: none !important;
}

::v-deep .vs-card__group-next {
  display: none !important;
}

</style>