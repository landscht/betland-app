<template>
  <vs-alert gradient :color="getColor" relief>
    <template #title>
      <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
        <div style="display: flex; align-items: center">
          <div style="display: flex; flex-direction: column">
            <span>Mon pari</span>
            <span class="txt-status">{{ getStatusText }}</span>
          </div>
          <div v-if="match.myBet && match.myBet.user && showReact" style="display: flex; justify-content: flex-end; margin-left: 20px" class="txt-react">
            <vs-tooltip dark bottom style="margin-right: 10px">
              {{ `😂 ${match.myBet.reactFunny ? match.myBet.reactFunny.length : '0'}` }}
              <template #tooltip v-if="match.myBet.reactFunny">
                <p class="tooltip-text" v-for="(user, i) in match.myBet.reactFunny" :key="i">{{ user.username}}</p>
              </template>
            </vs-tooltip>
            <vs-tooltip dark bottom style="margin-right: 10px">
              {{ `😮 ${match.myBet.reactWow ? match.myBet.reactWow.length : '0'}` }}
              <template #tooltip v-if="match.myBet.reactWow">
                <p class="tooltip-text" v-for="(user, i) in match.myBet.reactWow" :key="i">{{ user.username}}</p>
              </template>
            </vs-tooltip>
            <vs-tooltip dark bottom style="margin-right: 10px">
              {{ `👍 ${match.myBet.reactGood ? match.myBet.reactGood.length : '0'}` }}
              <template #tooltip v-if="match.myBet.reactGood">
                <p class="tooltip-text" v-for="(user, i) in match.myBet.reactGood" :key="i">{{ user.username}}</p>
              </template>
            </vs-tooltip>
          </div>
        </div>
        <div v-if="hasChange">
          <vs-button
              icon
              gradient
              color="dark"
              :active-disabled="getDisable"
              @click="createBet"
          >
            <i class='bx bx-save' ></i>
          </vs-button>
        </div>
      </div>
    </template>
    <div style="display: flex; justify-content: space-between">
      <vs-input :class="{'disabled': getDisable}" @keyup="controlNumeric($event)" :active="getDisable" v-model="match.myBet.homeScore"></vs-input>
      <vs-input :class="{'disabled': getDisable}" @keyup="controlNumericAway($event)" :active="getDisable"   v-model="match.myBet.awayScore"></vs-input>
    </div>
  </vs-alert>
</template>

<script lang="ts">

import {Component, Emit, Prop, Vue} from "vue-property-decorator";
import Match from "@/_models/Match";
import Bet, {BetStatus} from "@/_models/Bet";
import BetService from "@/_services/bet.service";
import Dayjs from "dayjs";
import dayjs from "dayjs";
import BetUtils from "@/_utils/bet.utils";

@Component
export default class BetAlert extends Vue {

  public betHomeLocal = '';
  public betAwayLocal = '';

  @Prop({ type: Object }) match!: Match;
  @Prop({ type: Boolean, default: false }) showReact!: boolean;

  mounted(): void {
    this.betHomeLocal = this.match.myBet.homeScore;
    this.betAwayLocal = this.match.myBet.awayScore;
  }

  get getColor(): string {
    return BetUtils.getColorByBet(this.match.myBet.status);
  }

  get getStatusText(): string {
    return BetUtils.getTextByBet(this.match.myBet.status);
  }

  get getDisable(): boolean {
    const date = Dayjs(this.match.date);
    return dayjs().isAfter(date) || this.match.finished;
  }

  get hasChange(): boolean {
    return ((this.betHomeLocal !== this.match.myBet.homeScore) || (this.betAwayLocal !== this.match.myBet.awayScore)) && !!this.match.myBet?.homeScore && !!this.match.myBet?.awayScore && !this.getDisable;
  }

  @Emit()
  async createBet(): Promise<Bet | void> {
    const betSaved: Bet = await BetService.createBetForMatch(this.match.id, this.match.myBet);
    const alreadyBet = !!this.match.myBet?.user;
    if (betSaved) {
      this.match.myBet = betSaved;
      this.betHomeLocal = this.match.myBet.homeScore;
      this.betAwayLocal = this.match.myBet.awayScore;
    }
    if (!alreadyBet) {
      return betSaved;
    }
  }

  controlNumeric(v: any): void {
    const val = v.target.value.replace(/[^0-9]/g, "");
    this.match.myBet.homeScore = val;
  }

  controlNumericAway(v: any): void {
    const val = v.target.value.replace(/[^0-9]/g, "");
    this.match.myBet.awayScore = val;
  }

}
</script>

<style scoped lang="scss">

.txt-status {
  font-size: x-small;
}

.txt-react {
  font-size: small;
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
  -webkit-appearance: none;
}

.tooltip-text {
  color: white;
  padding: 0;
  font-size: 12px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.disabled {
  pointer-events: none;
  opacity: 0.7;
}

</style>