<template>
  <div>
    <h2>Compétitions</h2>
    <table-admin :columns="columns" :data="competitionsLocals" @click-create="dialogCreate = true" @click-delete="onDeleteCompetition($event)" />
    <vs-dialog blur v-model="dialogCreate">
      <template #header>
        <h4 class="not-margin">
          Create <b>competition</b>
        </h4>
      </template>


      <div>
        <vs-input class="mb-3" v-model="competitionRequest.name" label-placeholder="Name" />
        <vs-input class="mb-3" v-model="competitionRequest.description" label-placeholder="Description" />
        <vs-input class="mb-3" v-model="competitionRequest.image" label-placeholder="Image url" />
      </div>

      <template #footer>
        <div class="footer-dialog">
          <vs-button block>
            Cancel
          </vs-button>
          <vs-button :active-disabled="!competitionRequest.name" block @click="onCreateCompetition">
            Create
          </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script lang="ts">

import {Component, Vue, Watch} from "vue-property-decorator";
import {namespace} from "vuex-class";
import Competition from "@/_models/Competition";
import TableAdmin from "@/components/TableAdmin.vue";
import MatchCategory from "@/_models/MatchCategory";
import competition from "@/_store/competition";

const competitionModule = namespace('CompetitionModule');

@Component({
  components: {TableAdmin}
})
export default class AdminCompetitionsView extends Vue {

  public competitionRequest: Competition = new Competition();
  public dialogCreate = false;
  public competitionsLocals: Competition[] = [];
  public columns: string[] = ['id', 'name', 'image'];

  @competitionModule.Action('retrieveAll')
  public retrieveAll!: (route: string) => void;

  @competitionModule.Action
  public create!: (params: { element: Competition, route: string }) => Competition;

  @competitionModule.Getter('getElements')
  public getCompetitions!: Competition[];

  @competitionModule.Action
  public deleteById!: (params: { id: string, route: string }) => void;

  mounted(): void {
    this.retrieveAll('competition');
  }

  @Watch('getCompetitions')
  watchCompetitions(): void {
    this.competitionsLocals = this.getCompetitions;
  }

  public onCreateCompetition() {
    this.create({ element: this.competitionRequest, route: 'competition' });
    this.dialogCreate = false;
  }

  public onDeleteCompetition(element: Competition) {
    this.deleteById({ id: element.id, route: 'competition' });
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