<template>
  <div style="display: flex; flex-direction: column; align-items: center;">
    <h3 v-if="!isMobile" style="margin-bottom: 0">{{ title }}</h3>
    <p v-else style="margin-bottom: 0">{{ title }}</p>
    <span>{{ subtitle }}</span>
    <vs-alert :style="{'height': height+'px'}" :color="color" relief :class="{'podium': !isMobile, 'podium-mobile': isMobile}">
      <h1>{{ innerText }}</h1>
    </vs-alert>
  </div>
</template>

<script lang="ts">

import {Component, Prop, Vue} from "vue-property-decorator";
import MobileMixin from "@/_mixins/MobileMixin";

@Component
export default class Podium extends MobileMixin{

  @Prop({ type: String, default: '' }) title!: string;
  @Prop({ type: String, default: '' }) subtitle!: string;
  @Prop({ type: String, default: '' }) innerText!: string;
  @Prop({ type: Number, default: 100 }) height!: number;
  @Prop({ type: String, default: 'warn' }) color!: string;

}
</script>

<style scoped>

.podium {
  width: 100px;
  text-align: center;
}

.podium-mobile {
  width: 80px;
  text-align: center;
}

</style>