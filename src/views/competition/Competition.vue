<template>
  <div>
    <h1 style="text-align: center">{{ competition.name }}</h1>
    <button-tab :buttons="buttons" />
    <router-view />
  </div>
</template>

<script lang="ts">

import {Component, Vue} from "vue-property-decorator";
import {namespace} from "vuex-class";
import Competition from "@/_models/Competition";
import ButtonTab from "@/components/ButtonTab.vue";
import {RouteName} from "@/router";
import ButtonTabProperties from "@/_models/ButtonTabProperties";

const competitionModule = namespace('CompetitionModule');
@Component({
  components: {ButtonTab}
})
export default class CompetitionView extends Vue {

  public competition: Competition = new Competition();
  public active = 'guide'
  public buttons: ButtonTabProperties[] = [];


  @competitionModule.Action
  public retrieveCompetitionById!: (idCompetition: string) => Promise<Competition>;

  async mounted(): Promise<void> {
    this.competition = await this.retrieveCompetitionById(this.$route.params.id);
    this.buttons.push({
      label: 'Matchs',
      to: `/home/competition/${this.competition.id}/matchs`
    });
    this.buttons.push({
      label: 'Equipes',
      to: `/home/competition/${this.competition.id}/teams`
    });
  }

}
</script>

<style scoped>

</style>