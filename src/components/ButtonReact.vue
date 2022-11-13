<template>
  <vs-button
      border
      color="#4d4d4d"
      size="small"
      :active="active"
      v-on="$listeners"
  >
    {{ label }}
  </vs-button>
</template>

<script lang="ts">

import {Component, Prop, Vue} from "vue-property-decorator";

@Component
export default class ButtonReact extends Vue {

  @Prop({ type: Boolean, default: false }) active!: boolean;
  @Prop({ type: String, default: '' }) label!: string;

}
</script>

<style scoped>

</style>