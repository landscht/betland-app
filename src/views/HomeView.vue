<template>
  <div>
    <Sidebar :active-sidebar="activeSidebar"></Sidebar>
    <div :class="{'content': !isMobile, 'content-mobile': isMobile}">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue';
import Sidebar from "@/components/Sidebar.vue";
import MobileMixin from "@/_mixins/MobileMixin";

@Component({
  components: {
    Sidebar,
    HelloWorld,
  },
})
export default class HomeView extends MobileMixin {

  public activeSidebar = true;

}
</script>

<style>

.content {
  margin-top: 50px;
  margin-left: 280px;
}

.content-mobile {
  padding-left: 50px;
}

</style>