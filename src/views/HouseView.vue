<template>
  <div>
    <vs-alert shadow closable v-model="alertModel" >
      <template #title>
        News !
      </template>
      Les matchs à éliminations directes sont ouverts ! Les paris que vous allez placés seront le score à la 90ème minutes, le score après les prolongations
      et le score après les tirs au buts ne sera pas pris en compte
    </vs-alert>
    <h1 v-if="!isMobile">Pariez sur les compétitions suivantes</h1>
    <h2 v-else>Pariez sur les compétitions suivantes</h2>
    <vs-button @click="redirectCompetition(competition.id)" :active-disabled="!!competition.description" style="width: 300px; height: 100px" gradient v-for="(competition, i) in getCompetitions" :key="i">
      <h2>{{ competition.name }}</h2>
      <template #animate>
        <i style="font-size: 30px" class='bx bx-football'></i>
      </template>
    </vs-button>
  </div>
</template>

<script lang="ts">

import {Component, Vue} from "vue-property-decorator";
import Competition from "@/_models/Competition";
import {namespace} from "vuex-class";
import MobileMixin from "@/_mixins/MobileMixin";

const competitionModule = namespace('CompetitionModule');

@Component
export default class HouseView extends MobileMixin {

  public alertModel = true;

  @competitionModule.Action('retrieveAll')
  public retrieveAll!: (route: string) => void;

  @competitionModule.Getter('getElements')
  public getCompetitions!: Competition[];

  mounted(): void {
    this.retrieveAll('competition');
  }

  redirectCompetition(idCompetition: string): void {
    this.$router.push(`/home/competition/${idCompetition}/matchs`);
  }

}

</script>

<style scoped>

</style>