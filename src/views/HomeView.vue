<template>
  <div>
    <div style="display: flex; justify-content: flex-end">
      <vs-avatar>
      </vs-avatar>
    </div>
    <Sidebar></Sidebar>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue';
import Sidebar from "@/components/Sidebar.vue";

@Component({
  components: {
    Sidebar,
    HelloWorld,
  },
})
export default class HomeView extends Vue {




}
</script>

<style>

.content {
  margin-left: 280px;
}

</style>