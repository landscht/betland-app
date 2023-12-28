<template>
  <div v-if="match">
    <div style="display: flex; justify-content: space-evenly; align-items: center; margin-bottom: 20px">
      <logo-info :url="match.homeTeam.isoCountry | getFlag" :flag="match.homeTeam.flag" :alt="match.homeTeam.name" :info="match.homeTeam.name" />
      <span class="txt-score">{{ match.finished ? match.homeScore : '-'}}</span>
      <span class="txt-score">{{ match.finished ? match.awayScore : '-'}}</span>
      <logo-info :url="match.awayTeam.isoCountry | getFlag" :flag="match.awayTeam.flag" :alt="match.awayTeam.name" :info="match.awayTeam.name" />
    </div>
    <p style="font-size: 15px"><i class="bx bx-time"></i> {{match.date | formatTime }}</p>
    <p style="font-size: 15px"><i class="bx bx-category"></i> {{match.matchCategory.name }}</p>
    <bet-alert :match="match" show-react v-on="$listeners" />
    <h3>Tous les paris</h3>
    <vs-table striped>
      <template #thead>
        <vs-tr>
          <vs-th>
            Utilisateurs
          </vs-th>
          <vs-th>
            Score
          </vs-th>
          <vs-th v-if="!isMobile">
            Dernière modification
          </vs-th>
          <vs-th>

          </vs-th>
        </vs-tr>
      </template>
      <template #tbody>
        <vs-tr
            :key="i"
            v-for="(bet, i) in match.bets"
            :data="bet"
        >
          <vs-td>
            <div style="display: flex; align-items: center">
              <badge-status-bet style="margin-right: 4px" :color="getColor(bet)"/> {{ bet.user.username }}
            </div>
          </vs-td>
          <vs-td>
            <span v-if="getDisable">{{ bet.homeScore }} - {{ bet.awayScore}}</span>
            <span v-else>-</span>
          </vs-td>
          <vs-td v-if="!isMobile">
            {{ bet.updateDate | formatDateTime }}
          </vs-td>
          <vs-td>
            <div style="display: flex">
              <vs-tooltip dark bottom>
                <button-react :active="bet.likedFunny"
                              @click="updateReact(bet, ReactType.FUNNY, !bet.likedFunny)"
                              :label="`😂 ${bet.reactFunny.length}`" />
                <template #tooltip>
                  <p class="tooltip-text" v-for="(user, i) in bet.reactFunny" :key="i">{{ user.username}}</p>
                </template>
              </vs-tooltip>
              <vs-tooltip dark bottom>
                <button-react :active="bet.likedWow"
                              @click="updateReact(bet, ReactType.WOW, !bet.likedWow)"
                              :label="`😮 ${bet.reactWow.length}`" />
                <template #tooltip>
                  <p class="tooltip-text" v-for="(user, i) in bet.reactWow" :key="i">{{ user.username}}</p>
                </template>
              </vs-tooltip>
              <vs-tooltip dark bottom>
                <button-react :active="bet.likedGood"
                              @click="updateReact(bet, ReactType.LIKE, !bet.likedGood)"
                              :label="`👍 ${bet.reactGood.length}`" />
                <template #tooltip>
                  <p class="tooltip-text" v-for="(user, i) in bet.reactGood" :key="i">{{ user.username}}</p>
                </template>
              </vs-tooltip>
            </div>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </div>
</template>

<script lang="ts">

import {Component, Prop, Vue} from "vue-property-decorator";
import Match from "@/_models/Match";
import LogoInfo from "@/components/LogoInfo.vue";
import BetAlert from "@/components/BetAlert.vue";
import Bet, {BetStatus, ReactType} from "@/_models/Bet";
import BetService from "@/_services/bet.service";
import ButtonReact from "@/components/ButtonReact.vue";
import BadgeStatusBet from "@/components/BadgeStatusBet.vue";
import MobileMixin from "@/_mixins/MobileMixin";
import BetUtils from "@/_utils/bet.utils";
import Dayjs from "dayjs";
import dayjs from "dayjs";

@Component({
  components: {BadgeStatusBet, ButtonReact, BetAlert, LogoInfo}
})
export default class MatchDetailsDialog extends MobileMixin{

  public ReactType = ReactType;

  @Prop({ type: Object }) match!: Match;

  get getDisable(): boolean {
    const date = Dayjs(this.match.date);
    return dayjs().isAfter(date) || this.match.finished;
  }

  getColor(bet: Bet): string {
    return BetUtils.getColorByBet(bet.status);
  }

  async updateReact(bet: Bet, reactType: ReactType, addReact: boolean): Promise<void> {
    const betSaved: Bet = addReact ? await BetService.addReactForBet(this.match.id, bet.user.id, reactType) : await BetService.removeReactForBet(this.match.id, bet.user.id, reactType);
    switch (reactType) {
      case ReactType.FUNNY:
        bet.likedFunny = betSaved.likedFunny;
        bet.reactFunny = betSaved.reactFunny;
        break;
      case ReactType.WOW:
        bet.likedWow = betSaved.likedWow;
        bet.reactWow = betSaved.reactWow;
        break;
      case ReactType.LIKE:
        bet.likedGood = betSaved.likedGood;
        bet.reactGood = betSaved.reactGood;
        break;
    }
  }

}
</script>

<style scoped>

.tooltip-text {
  color: white;
  padding: 0;
  font-size: 12px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

</style>