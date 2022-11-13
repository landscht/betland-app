<template>
  <div v-if="match">
    <div style="display: flex; justify-content: space-evenly; align-items: center; margin-bottom: 20px">
      <logo-info :url="match.homeTeam.isoCountry | getFlag" :alt="match.homeTeam.name" :info="match.homeTeam.name" />
      <span class="txt-score">2</span>
      <span class="txt-score">1</span>
      <logo-info :url="match.awayTeam.isoCountry | getFlag" :alt="match.awayTeam.name" :info="match.awayTeam.name" />
    </div>
    <bet-alert :match="match" />
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
          <vs-th>
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
            {{ bet.user.username }}
          </vs-td>
          <vs-td>
            {{ bet.homeScore }} - {{ bet.awayScore}}
          </vs-td>
          <vs-td>
            {{ bet.updateDate | formatDateTime }}
          </vs-td>
          <vs-td>
            <div style="display: flex">
              <button-react :active="bet.likedFunny"
                            @click="updateReact(bet, ReactType.FUNNY, !bet.likedFunny)"
                            :label="`😂 ${bet.reactFunny.length}`" />
              <button-react :active="bet.likedWow"
                            @click="updateReact(bet, ReactType.WOW, !bet.likedWow)"
                            :label="`😮 ${bet.reactWow.length}`" />
              <button-react :active="bet.likedGood"
                            @click="updateReact(bet, ReactType.LIKE, !bet.likedGood)"
                            :label="`👍 ${bet.reactGood.length}`" />
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
import Bet, {ReactType} from "@/_models/Bet";
import BetService from "@/_services/bet.service";
import ButtonReact from "@/components/ButtonReact.vue";

@Component({
  components: {ButtonReact, BetAlert, LogoInfo}
})
export default class MatchDetailsDialog extends Vue{

  public ReactType = ReactType;

  @Prop({ type: Object }) match!: Match;

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

</style>