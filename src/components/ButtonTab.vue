<template>
  <vs-button-group dark style="display: flex; justify-content: flex-start">
    <vs-button v-for="(button, i) in buttons"
               :key="i"
               :to="button.to"
               :active="button.to === $route.path"
               dark
               flat
               icon>
      {{ button.label }}
    </vs-button>
  </vs-button-group>
</template>

<script lang="ts">

import {Component, Prop, Vue} from "vue-property-decorator";
import ButtonTabProperties from "@/_models/ButtonTabProperties";

@Component
export default class ButtonTab extends Vue {

  @Prop({ type: Array, default: () => [] }) buttons!: ButtonTabProperties[];

}
</script>

<style scoped>

</style>