<template>
  <vs-select :label-placeholder="placeholder" v-model="selectedIndex" @change="selectElement($event)">
    <vs-option v-for="(element, i) in elements" :key="i" :label="element[valueLabel]" :value="`_${i}_`">
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
    if (this.model) {
      this.selectedIndex = `_${this.elements.findIndex((e: any) => e.id === this.model.id).toString()}_`;
    }
  }

  selectElement(index: string) {
    const indexInt = Number(index.slice(1, index.length - 1));
    this.model = this.elements[indexInt];
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