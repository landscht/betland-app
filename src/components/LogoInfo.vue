<template>
<div style="display: flex; flex-direction: column; align-items: center">
  <img class="img" :src="url" :alt="alt">
  <span class="info">{{ info }}</span>
</div>
</template>

<script lang="ts">

import {Component, Prop, Vue} from "vue-property-decorator";

@Component
export default class LogoInfo extends Vue {

  @Prop({ type: String, default: '' }) url!: string;
  @Prop({ type: String, default: '' }) alt!: string;
  @Prop({ type: String, default: '' }) info!: string;

}
</script>

<style scoped>

.img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-bottom: 5px;
}

.info {
  font-weight: bold;
}

</style>