<template>
  <vs-sidebar
      v-model="active"
      :reduce="isMobile"
      :open.sync="activeSidebar"
  >
    <div style="display: flex; justify-content: center; width: 100%; margin-top: 20px">
      <img :width="isMobile ? 50 : 150" src="@/assets/logo.png" />
    </div>
    <h3 v-if="!isMobile" class="ml-3">{{ `Bonjour ${getCurrentUser.username }`}}</h3>
    <vs-sidebar-item id="house" to="/home/">
      <template #icon>
        <i class='bx bx-home'></i>
      </template>
      Accueil
    </vs-sidebar-item>
    <vs-sidebar-group>
      <template #header>
        <vs-sidebar-item arrow>
          <template #icon>
            <i class='bx bx-cog'></i>
          </template>
          Informations
        </vs-sidebar-item>
      </template>
      <vs-sidebar-item id="infoPrivacyPolicy" to="/home/info/privacyPolicy">
        <template #icon>
          <i class='bx bx-lock'></i>
        </template>
        Politique de confidentialité
      </vs-sidebar-item>
      <vs-sidebar-item id="infoHelp" to="/home/info/rules">
        <template #icon>
          <i class='bx bx-help-circle'></i>
        </template>
        Comment jouer ?
      </vs-sidebar-item>
      <vs-sidebar-item id="infoCredits" to="/home/info/credits">
        <template #icon>
          <i class='bx bx-medal'></i>
        </template>
        Credits
      </vs-sidebar-item>
    </vs-sidebar-group>
    <vs-sidebar-group v-if="isAdmin">
      <template #header>
        <vs-sidebar-item arrow>
          <template #icon>
            <i class='bx bx-cog'></i>
          </template>
          Admin
        </vs-sidebar-item>
      </template>

      <vs-sidebar-item id="adminCompetition" to="/home/admin/competitions">
        Competitions
      </vs-sidebar-item>
      <vs-sidebar-item id="adminTeam" to="/home/admin/teams">
        Teams
      </vs-sidebar-item>
      <vs-sidebar-item id="adminCategory" to="/home/admin/categories">
        Categories
      </vs-sidebar-item>
      <vs-sidebar-item id="adminMatchs" to="/home/admin/matchs">
        Matchs
      </vs-sidebar-item>
    </vs-sidebar-group>
    <template #footer>
      <vs-button
          gradient
          style="width: 100%"
          danger
          animation-type="scale"
          @click="logout"
      >
        <i class='bx bx-log-out' ></i>
        <template #animate >
          Se déconnecter
        </template>
      </vs-button>
    </template>
  </vs-sidebar>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue} from "vue-property-decorator";
import {AuthorizationService} from "@/_services/authorization.service";
import {PagePlaylists} from "@/_models/_playlist/PagePlaylists";
import {PlaylistService} from "@/_services/playlist.service";
import {namespace} from "vuex-class";
import JwtResponse from "@/_models/_response/JwtResponse";
import MobileMixin from "@/_mixins/MobileMixin";

const authModule = namespace('AuthModule');

@Component
export default class Sidebar extends MobileMixin {

  public active = 'house';

  @authModule.Getter
  public getCurrentUser!: JwtResponse;

  @authModule.Getter
  public isAdmin!: boolean;

  @authModule.Action
  public logout!: () => void;

  @Prop({ type: Boolean, default: true}) activeSidebar!: boolean;

}
</script>

<style scoped>

</style>