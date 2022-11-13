<template>
  <div>
    <h2>Crédits</h2>
    <p>
      <b>Betland</b> fut entièrement développé par <b>Tony Landschoot</b>.
    </p>
    <vs-button blank transparent animation-type="vertical" href="https://github.com/landscht">
      Visiter mon Github
      <template #animate >
        <i class='bx bxl-github' ></i>
      </template>
    </vs-button>


  </div>
</template>

<script lang="ts">

import {Component, Vue} from "vue-property-decorator";

@Component
export default class Credits extends Vue {

}
</script>

<style scoped>

</style>