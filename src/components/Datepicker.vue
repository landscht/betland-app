<template>
  <div style="display: flex; justify-content: space-between">
    <vs-input type="date" v-model="date" :label-placeholder="label" @change="changeDate" />
    <vs-input type="time" v-model="time" :label-placeholder="label" @change="changeDate" />
  </div>
</template>

<script lang="ts">

import {Component, Prop, VModel, Vue} from "vue-property-decorator";
import dayjs from "dayjs";
import Dayjs from "dayjs";

@Component
export default class Datepicker extends Vue{

  public date = dayjs().format('YYYY-MM-DD');
  public time = '00:00';

  @VModel({ type: String }) dateModel!: string;
  @Prop({ type: String, default: '' }) label!: string;

  mounted(): void {
    if (this.dateModel) {
      this.date = Dayjs(this.dateModel).format('YYYY-MM-DD');
      this.time = Dayjs(this.dateModel).format('HH:mm');
    } else {
      this.dateModel = dayjs(`${this.date} ${this.time}`).format('YYYY-MM-DDTHH:mm:ss.SSSSSSZ');
    }
  }

  changeDate() {
    this.dateModel = dayjs(`${this.date} ${this.time}`).format('YYYY-MM-DDTHH:mm:ss.SSSSSSZ');
  }

}
</script>

<style scoped>

::v-deep .vs-input {
  width: 100%;
}

</style>