<template>
  <div>
    <h2>Categories</h2>
    <table-admin :columns="columns" :data="categoriesLocal" @click-create="dialogCreate = true" @click-delete="onDeleteTeam($event)" />
    <vs-dialog blur v-model="dialogCreate">
      <template #header>
        <h4 class="not-margin">
          Create <b>category</b>
        </h4>
      </template>


      <div>
        <vs-input class="mb-3" v-model="categoryRequest.name" label-placeholder="Name" />
        <Select v-model="categoryRequest.competition" placeholder="Competition" :elements="getCompetitions" value-label="name" />
      </div>

      <template #footer>
        <div class="footer-dialog">
          <vs-button block>
            Cancel
          </vs-button>
          <vs-button :active-disabled="!categoryRequest.name" block @click="onCreateTeam">
            Create
          </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script lang="ts">

import {Component, Vue, Watch} from "vue-property-decorator";
import Team from "@/_models/Team";
import {namespace} from "vuex-class";
import MatchCategory from "@/_models/MatchCategory";
import TableAdmin from "@/components/TableAdmin.vue";
import Competition from "@/_models/Competition";
import Select from "@/components/Select.vue";

const matchCategoryModule = namespace('MatchCategoryModule');
const competitionModule = namespace('CompetitionModule');
@Component({
  components: {Select, TableAdmin}
})
export default class AdminCategoryView extends Vue {

  public categoryRequest: MatchCategory = new MatchCategory();
  public dialogCreate = false;
  public categoriesLocal: MatchCategory[] = [];
  public columns: string[] = ['id', 'name'];

  @matchCategoryModule.Action('retrieveAll')
  public retrieveAllCategories!: (route: string) => void;

  @competitionModule.Action('retrieveAll')
  public retrieveAllCompetitions!: (route: string) => void;

  @matchCategoryModule.Action
  public create!: (params: { element: MatchCategory, route: string }) => MatchCategory;

  @matchCategoryModule.Getter('getElements')
  public getCategories!: MatchCategory[];

  @competitionModule.Getter('getElements')
  public getCompetitions!: Competition[];

  @matchCategoryModule.Action
  public deleteById!: (params: { id: string, route: string }) => void;

  mounted(): void {
    this.retrieveAllCategories('matchCategory');
    this.retrieveAllCompetitions('competition');
  }

  @Watch('getCategories')
  watchCompetitions(): void {
    this.categoriesLocal = this.getCategories;
  }

  public onCreateTeam() {
    this.create({ element: this.categoryRequest, route: 'matchCategory' });
    this.dialogCreate = false;
  }

  public onDeleteTeam(element: MatchCategory) {
    this.deleteById({ id: element.id, route: 'matchCategory' });
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