<template>
  <div>
    <h2>Classement</h2>
    <div style="display: flex; justify-content: center; align-items: flex-end; margin-bottom: 30px">
      <podium style="margin-right: 10px; margin-left: 10px" color="#C0C0C0" inner-text="2" :title="getSecond ? getSecond.user.username : ''" :subtitle="`${getSecond ? `${getSecond.points} points` : ''}`" :height="100" />
      <podium style="margin-right: 10px; margin-left: 10px" color="warn" inner-text="1" :title="getFirst ? getFirst.user.username : ''" :subtitle="`${getFirst ? `${getFirst.points} points` : ''}`" :height="150" />
      <podium style="margin-right: 10px; margin-left: 10px" color="#CD7F32" inner-text="3" :title="getThird ? getThird.user.username : ''" :subtitle="`${getThird ? `${getThird.points} points` : ''}`" :height="75" />
    </div>
    <div style="display: flex; justify-content: center">
      <vs-table striped :class="{'table': !isMobile, 'table-mobile': isMobile}">
        <template #thead>
          <vs-tr>
            <vs-th :class="{'cell-mobile': isMobile}">
              Rang
            </vs-th>
            <vs-th :class="{'cell-mobile': isMobile}">
              Username
            </vs-th>
            <vs-th>
              Points
            </vs-th>
          </vs-tr>
        </template>
        <template #tbody>
          <vs-tr
              :key="i"
              v-for="(tr, i) in standings.slice(3, standings.length)"
              :data="tr"
          >
            <vs-td>
              {{ i+4 }}
            </vs-td>
            <vs-td>
              {{ tr.user.username }}
            </vs-td>
            <vs-td>
              {{ tr.points }}
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </div>
  </div>
</template>

<script lang="ts">

import {Component, Vue} from "vue-property-decorator";
import RankService from "@/_services/rank.service";
import Rank from "@/_models/Rank";
import Podium from "@/components/Podium.vue";
import MobileMixin from "@/_mixins/MobileMixin";
@Component({
  components: {Podium}
})
export default class StandingCompetitionView extends MobileMixin {

  public standings: Rank[] = [];

  get getFirst(): Rank {
    return this.standings[0];
  }

  get getSecond(): Rank {
    return this.standings[1];
  }

  get getThird(): Rank {
    return this.standings[2];
  }

  async mounted(): Promise<void> {
    this.standings = await RankService.getStandingsByCompetition(this.$route.params.id);
  }

}
</script>

<style scoped>

::v-deep .vs-alert__content__text {
  padding: 0;
}

.table {
  width: 60%;
}

.table-mobile {
  width: 300px !important;
}

.cell-mobile {
  width: 20px !important;
}

</style>