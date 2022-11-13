<template>
  <div>
    <h2>Comment jouer ?</h2>
    <p>Avec <b>Betland</b> vous allez pouvoir parier sur plusieurs compétitions entre amis et voir qui est le plus fort !</p>
    <p>Chaque compétition à son propre classement de paris, pour gagner des points dans le classement, il faut penser à parier sur chaque match de la compétition.</p>
    <p>Vous pouvez parier sur un match avant le début de celui ci, ensuite il ne sera plus possible, donc pensez y! Il sera possible de modifier un pari avant le début du match.</p>
    <p>Pour gagner des points dans le classement et espérer rejoindre le haut du tableau, il faudra valider votre paris</p>
    <p>En cas de mauvais pari vous ne gagnez aucun point. En cas de bon pari vous gagnez 1 point, et le score exact remporte 3 points.</p>
    <p>Vous pouvez réagir aux paris de vos amis!</p>
    <p>Pour commencer, rendez vous sur la liste des compétitions :</p>
    <vs-button to="/home/">Allez vers les compétitions</vs-button>
  </div>
</template>

<script lang="ts">

import {Component, Vue} from "vue-property-decorator";

@Component
export default class RulesView extends Vue{
}
</script>

<style scoped>

</style>