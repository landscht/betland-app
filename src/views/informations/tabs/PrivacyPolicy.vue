<template>
  <div>
    <h2>Politique de confidentialité</h2>
    <p>
      <b>Betland</b> n'utilise aucune de vos données. Elles ne sont ni stockées ni collectées.
    </p>
    <p>
      Seul votre adresse email entré lors de votre inscription est stocké à des fins d'authentification et de vérification, mais elle n'a aucun usage commercial.
    </p>
    <p>
      Votre vie privée est une chose importante pour nous. C'est pourquoi notre site web et nos applications ne collectent pas d'informations personnelles identifiables ni de
      données de localisation. Nous n'utilisons pas de SDK externes et nous ne réalisons aucune communication avec un service tier. <b>Betland</b> peut être utilisé sans partager
      aucune information personnelle identifiable.
    </p>
    <p>
      En utilisant notre site ou nos applications, vous acceptez notre politique de confidentialité.
    </p>
    <p>
      Si vous avez des questions concernant cette politique de confidentialité, vous pouvez envoyer un courriel :
    </p>
    <vs-button transparent href="mailto:betland@gmail.com">
      betland@gmail.com
      <template #animate >
        <i class='bx bx-mail-send' ></i>
      </template>
    </vs-button>
    <p>
      Nous nous réservons le droit de mettre à jour notre politique de confidentialité à l'avenir. Consultez fréquemment notre politique de confidentialité pour être toujours au
      courant de la politique que vous acceptez en utilisant cette application. Nous publierons les modifications apportées à la politique de confidentialité sur cette page.</p>
  </div>
</template>

<script lang="ts">
import {Vue} from "vue-property-decorator";

export default class PrivacyPolicy extends Vue{
}
</script>

<style scoped>

</style>