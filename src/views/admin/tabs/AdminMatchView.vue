<template>
  <div v-if="matchsLocal">
    <h2>Matchs</h2>
    <table-admin :columns="columns" :data="matchsLocal" @click-create="openCreateDialog" @click-delete="onDelete($event)" @edit="onEdit($event)" />
    <vs-dialog blur v-model="dialogCreate">
      <template #header>
        <h4 class="not-margin">
          Create <b>match</b>
        </h4>
      </template>


      <div>
        <vs-input class="mb-3" v-model="matchRequest.description" label-placeholder="Description" />
        <div class="footer-dialog mb-3">
          <Select v-model="matchRequest.competition" placeholder="Competition" :elements="getCompetitions" value-label="name" />
          <Select v-model="matchRequest.matchCategory" placeholder="Category" :elements="getCategories" value-label="name" />

        </div>
        <div class="footer-dialog mb-3">
          <Select v-model="matchRequest.homeTeam" placeholder="Home team" :elements="getTeams" value-label="name" />
          <Select v-model="matchRequest.awayTeam" placeholder="Away team" :elements="getTeams" value-label="name" />
        </div>
        <div class="footer-dialog mb-3">
          <vs-input v-model="matchRequest.homeScore" label-placeholder="Home score" />
          <vs-input v-model="matchRequest.awayScore" label-placeholder="Away score" />
        </div>
        <datepicker class="mb-3" label="Date" v-model="matchRequest.date" />
        <vs-checkbox class="mb-3" v-model="matchRequest.finished">
          Finished
        </vs-checkbox>
      </div>

      <template #footer>
        <div class="footer-dialog">
          <vs-button block>
            Cancel
          </vs-button>
          <vs-button block @click="onCreate">
            Create
          </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script lang="ts">

import {Component, Vue, Watch} from "vue-property-decorator";
import MatchCategory from "@/_models/MatchCategory";
import Competition from "@/_models/Competition";
import {namespace} from "vuex-class";
import Match from "@/_models/Match";
import TableAdmin from "@/components/TableAdmin.vue";
import Select from "@/components/Select.vue";
import Datepicker from "@/components/Datepicker.vue";

const matchModule = namespace('MatchModule');
const competitionModule = namespace('CompetitionModule');
const matchCategoryModule = namespace('MatchCategoryModule');
const teamModule = namespace('TeamModule');

@Component({
  components: {Datepicker, Select, TableAdmin}
})
export default class AdminMatchView extends Vue {
  public matchRequest: Match = new Match();
  public dialogCreate = false;
  public matchsLocal: Match[] = [];
  public columns: string[] = ['competition.name', 'homeTeam.name', 'awayTeam.name', 'homeScore', 'awayScore', 'date', 'finished'];

  @matchCategoryModule.Action('retrieveAll')
  public retrieveAllCategories!: (route: string) => void;

  @competitionModule.Action('retrieveAll')
  public retrieveAllCompetitions!: (route: string) => void;

  @teamModule.Action('retrieveAll')
  public retrieveAllTeams!: (route: string) => void;

  @matchModule.Action('retrieveAll')
  public retrieveAllMatchs!: (route: string) => void;

  @matchModule.Action
  public create!: (params: { element: Match, route: string }) => Match;

  @matchModule.Getter('getElements')
  public getMatchs!: Match[];

  @matchCategoryModule.Getter('getElements')
  public getCategories!: MatchCategory[];

  @competitionModule.Getter('getElements')
  public getCompetitions!: Competition[];

  @teamModule.Getter('getElements')
  public getTeams!: Competition[];

  @matchCategoryModule.Action
  public deleteById!: (params: { id: string, route: string }) => void;

  mounted(): void {
    this.retrieveAllMatchs('match');
    this.retrieveAllCategories('matchCategory');
    this.retrieveAllCompetitions('competition');
    this.retrieveAllTeams('team');
  }

  @Watch('getMatchs')
  watchCompetitions(): void {
    this.matchsLocal = this.getMatchs;
  }

  public onEdit(match: Match): void {
    this.matchRequest = match;
    this.dialogCreate = true;
  }

  public openCreateDialog(): void {
    this.matchRequest = new Match();
    this.dialogCreate = true;
  }

  public onCreate() {
    this.create({ element: this.matchRequest, route: 'match' });
    this.dialogCreate = false;
  }

  public onDelete(element: Match) {
    this.deleteById({ id: element.id, route: 'match' });
  }
}
</script>

<style scoped>

::v-deep .vs-input {
  width: 100%;
}

.footer-dialog {
  display: flex;
  justify-content: space-between;
}

</style>