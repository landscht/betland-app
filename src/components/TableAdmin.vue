<template>
  <div>
    <vs-table>
      <template #header>
        <vs-input v-model="search" border placeholder="Search" />
      </template>
      <template #thead>
        <vs-tr>
          <vs-th v-for="(column, i) in columns" :key="i" sort @click="data = $vs.sortData($event ,data, column)">
            {{ column}}
          </vs-th>
          <vs-th>
            Actions
          </vs-th>
        </vs-tr>
      </template>
      <template #tbody>
        <vs-tr
            :key="i"
            v-for="(tr, i) in $vs.getSearch(data, search)"
            :data="tr">
          <vs-td v-for="(column, i) in columns" :key="i">
            {{ getValue(column, tr) }}
          </vs-td>
          <vs-td>
            <div style="display: flex">
              <vs-button icon danger @click="openDeleteDialog(tr)">
                <i class='bx bx-trash'></i>
              </vs-button>
              <vs-button icon @click="edit(tr)">
                <i class='bx bx-edit'></i>
              </vs-button>
            </div>
          </vs-td>
        </vs-tr>
      </template>
      <template #footer>
        <div class="footer-table">
          <vs-button @click="clickCreate">
            Create
            <template #animate >
              <i class='bx bx-plus' ></i>
            </template>
          </vs-button>
        </div>
      </template>
    </vs-table>
    <vs-dialog width="550px" blur v-model="dialogDelete">
      <template #header>
        <h4 class="not-margin">
          Attention, Veut tu vraiment supprimer ? 🚨
        </h4>
      </template>

      <template #footer>
        <div class="con-footer">
          <vs-button @click="clickDelete" dark>
            Oui
          </vs-button>
          <vs-button @click="dialogDelete = false">
            Non
          </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script lang="ts">

import {Component, Emit, Prop, Vue} from "vue-property-decorator";
import Competition from "@/_models/Competition";

@Component
export default class TableAdmin extends Vue {

  @Prop({ type: Array, default: () => [] }) data!: any[];
  @Prop({ type: Array, default: () => [] }) columns!: string[];

  public selectedElement: any;
  public dialogDelete = false;

  public search = '';
  public selected: any[] = [];

  openDeleteDialog(element: any) {
    this.selectedElement = element;
    this.dialogDelete = true;
  }

  @Emit()
  clickCreate(): void {return;}

  getValue(key: string, element: any): string {
    const k = key.split('.');
    if (k.length > 1) {
      return this.getValue(k[1], element[k[0]]);
    }
    return element[k[0]];
  }

  @Emit()
  clickDelete(): any {
    this.dialogDelete = false;
    return this.selectedElement;
  }

  @Emit()
  edit(element: any): any {
    return element;
  }

}
</script>

<style scoped>

.footer-table {
  display: flex;
  justify-content: flex-end;
}

.td-checkbox {
  width: 25px;
}

.con-footer {
  display: flex;
  justify-content: flex-end;
}

</style>