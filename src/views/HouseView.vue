<template>
  <div>
    <h1>Pariez sur les compétitions suivantes</h1>
    <vs-card class="mb-3" v-for="(competition, i) in getCompetitions" :key="i" @click="redirectCompetition(competition.id)">
      <template #title>
        <h3>{{ competition.name }}</h3>
      </template>
      <template #text>
        <p>
          {{ competition.description }}
        </p>
      </template>
    </vs-card>
  </div>
</template>

<script lang="ts">

import {Component, Vue} from "vue-property-decorator";
import Competition from "@/_models/Competition";
import {namespace} from "vuex-class";

const competitionModule = namespace('CompetitionModule');

@Component
export default class HouseView extends Vue {

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