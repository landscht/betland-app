<template>
  <div>
    <h2>Teams</h2>
    <table-admin :columns="columns" :data="teamsLocal" @click-create="dialogCreate = true" @click-delete="onDeleteTeam($event)" />
    <vs-dialog blur v-model="dialogCreate">
      <template #header>
        <h4 class="not-margin">
          Create <b>team</b>
        </h4>
      </template>


      <div>
        <vs-input class="mb-3" v-model="teamRequest.name" label-placeholder="Name" />
        <vs-input class="mb-3" v-model="teamRequest.isoCountry" label-placeholder="Iso code pays" />
        <vs-input class="mb-3" v-model="teamRequest.flag" label-placeholder="Drapeau url" />
      </div>

      <template #footer>
        <div class="footer-dialog">
          <vs-button block>
            Cancel
          </vs-button>
          <vs-button :active-disabled="!teamRequest.name" block @click="onCreateTeam">
            Create
          </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script lang="ts">

import {Component, Vue, Watch} from "vue-property-decorator";
import Competition from "@/_models/Competition";
import Team from "@/_models/Team";
import {namespace} from "vuex-class";
import TableAdmin from "@/components/TableAdmin.vue";

const teamModule = namespace('TeamModule');
@Component({
  components: {TableAdmin}
})
export default class AdminTeamView extends Vue {

  public teamRequest: Team = new Team();
  public dialogCreate = false;
  public teamsLocal: Team[] = [];
  public columns: string[] = ['id', 'name', 'flag'];

  @teamModule.Action('retrieveAll')
  public retrieveTeams!: (route: string) => void;

  @teamModule.Action
  public create!: (params: { element: Team, route: string }) => Team;

  @teamModule.Getter('getElements')
  public getTeams!: Team[];

  @teamModule.Action
  public deleteById!: (params: { id: string, route: string }) => void;

  mounted(): void {
    this.retrieveTeams('team');
  }

  @Watch('getTeams')
  watchCompetitions(): void {
    this.teamsLocal = this.getTeams;
  }

  public onCreateTeam() {
    this.create({element: this.teamRequest, route: 'team'});
    this.dialogCreate = false;
  }

  public onDeleteTeam(element: Team) {
    this.deleteById({id: element.id, route: 'team'});
  }

}
</script>

<style scoped>

.footer-dialog {
  display: flex;
  justify-content: space-between;
}

::v-deep .vs-input {
  width: 100%;
}

</style>