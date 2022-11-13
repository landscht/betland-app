<template>
  <vs-select :label-placeholder="placeholder" v-model="selectedIndex" @change="selectElement($event)">
    <vs-option v-for="(element, i) in elements" :key="i" :label="element[valueLabel]" :value="`${i}`">
      {{ element[valueLabel] }}
    </vs-option>
  </vs-select>
</template>

<script lang="ts">
import {Component, Prop, VModel, Vue} from "vue-property-decorator";

@Component
export default class Select extends Vue {

  @VModel({ type: Object }) model!: any;

  @Prop({ type: String, default: 'Select' }) placeholder!: string;
  @Prop({ type: Array, default: () => [] }) elements!: any[];
  @Prop({ type: String, default: '' }) valueLabel!: string;
  selectedIndex = '';

  mounted(): void {
    console.log(this.model);
    if (this.model) {
      this.selectedIndex = this.elements.findIndex((e: any) => e.id === this.model.id).toString();
    }
  }

  selectElement(index: string) {
    this.model = this.elements[Number(index)];
  }

}
</script>

<style>

:root {
  --vs-background: 30, 32, 35 !important;
  --vs-text: 255, 255, 255 !important;
  --vs-gray-2: 30, 32, 35 !important;
}

</style>