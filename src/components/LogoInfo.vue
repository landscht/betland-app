<template>
<div style="display: flex; flex-direction: column; align-items: center">
  <img class="img" :src="flag ? flag : url" :alt="alt">
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
  @Prop({ type: String, default: '' }) flag!: string;

}
</script>

<style scoped>

.img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-bottom: 5px;
  background-size: cover;
}

.info {
  font-weight: bold;
}

</style>