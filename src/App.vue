<template>
  <div id="app" vs-theme="dark">
    <router-view/>
  </div>
</template>

<script lang="ts">

import {Component, Vue} from "vue-property-decorator";

@Component
export default class App extends Vue {

  mounted(): void {
    (window as any).onSpotifyWebPlaybackSDKReady = () => undefined;
  }

}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}


nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.mb-3 {
  margin-bottom: 30px !important;
}

.ml-3 {
  margin-left: 30px;
}
</style>
