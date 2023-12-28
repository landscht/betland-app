<template>
  <vs-avatar circle danger size="10" :color="color" />
</template>

<script lang="ts">

import {Component, Prop, Vue} from "vue-property-decorator";

@Component
export default class BadgeStatusBet extends Vue {

  @Prop({ type: String, default: ''}) color!: string;

}
</script>

<style scoped>

</style>