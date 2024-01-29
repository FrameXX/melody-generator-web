<script lang="ts" setup>
import Toaster from "./components/Toaster.vue";
import App from "./modules/app";
import Setup from "./components/Setup.vue";

const app = new App();
</script>

<template>
  <main>
    <div id="controls"></div>
  </main>
  <setup :app="app" />
  <toaster :toaster="app.ui.toaster" />
</template>

<style lang="scss">
#app main {
  text-align: center;
  display: flex;
  justify-content: center;
}

#controls {
  max-width: 960px;
  width: -webkit-fill-available;
}

@media screen and (min-width: 760px) {
  #content-wrapper {
    columns: 2;
  }
}
</style>
