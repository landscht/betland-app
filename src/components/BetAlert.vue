<template>
  <vs-alert gradient color="#7d33ff" relief>
    <template #title>
      <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
        <div style="display: flex; flex-direction: column">
          <span>Mon paris</span>
          <span class="txt-status">{{ match.myBet.user ? 'Paris placé' : 'Entrez votre paris' }}</span>
        </div>
        <div v-if="hasChange">
          <vs-button
              icon
              gradient
              @click="createBet"
          >
            <i class='bx bx-save' ></i>
          </vs-button>
        </div>
      </div>
    </template>
    <div style="display: flex; justify-content: space-between">
      <vs-input v-model="match.myBet.homeScore"></vs-input>
      <vs-input v-model="match.myBet.awayScore"></vs-input>
    </div>
  </vs-alert>
</template>

<script lang="ts">

import {Component, Prop, Vue} from "vue-property-decorator";
import Match from "@/_models/Match";
import Bet from "@/_models/Bet";
import BetService from "@/_services/bet.service";

@Component
export default class BetAlert extends Vue {

  public betHomeLocal = '';
  public betAwayLocal = '';

  @Prop({ type: Object }) match!: Match;

  mounted(): void {
    this.betHomeLocal = this.match.myBet.homeScore;
    this.betAwayLocal = this.match.myBet.awayScore;
  }

  get hasChange(): boolean {
    return (this.betHomeLocal !== this.match.myBet.homeScore) || (this.betAwayLocal !== this.match.myBet.awayScore);
  }

  async createBet(): Promise<void> {
    const betSaved: Bet = await BetService.createBetForMatch(this.match.id, this.match.myBet);
    if (betSaved) {
      this.match.myBet = betSaved;
      this.betHomeLocal = this.match.myBet.homeScore;
      this.betAwayLocal = this.match.myBet.awayScore;
    }
  }


}
</script>

<style scoped>

.txt-status {
  font-size: x-small;
}

.txt-score {
  font-size: medium;
  font-weight: bold;
}

::v-deep .vs-input {
  width:50px;
  height: 50px;
  font-size: 20px;
  text-align: center;
}


</style>