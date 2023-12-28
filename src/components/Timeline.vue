<template>
  <div style="display: flex">
    <div style="width: 15px; height: 10px; margin: 1px" :class="{'first': i === 0, 'last': i === bets.length -1}" :style="{'background-color': getColorByBet(bet.status)}" v-for="(bet, i) in bets" :key="i"></div>
  </div>
</template>

<script lang="ts">

import {Component, Prop, Vue} from "vue-property-decorator";
import Bet, {BetStatus} from "@/_models/Bet";
import BetUtils from "@/_utils/bet.utils";

@Component
export default class Timeline extends Vue {

  @Prop({type: Array, default: () => []}) bets!: Bet[];

  getColorByBet(status: BetStatus): string {
    return BetUtils.getColorByBet(status);
  }

}
</script>

<style scoped>

.first {
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
}

.last {
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
}

</style>