<template>
  <div>
    <h1>Informations</h1>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">

import {Component, Vue} from "vue-property-decorator";

@Component
export default class InfoView extends Vue{
}
</script>

<style scoped>

</style>