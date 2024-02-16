<script lang="ts" setup>
import Toaster from "./components/Toaster.vue";
import App from "./modules/app";
import BottomNavBar from "./components/BottomNavBar.vue";

const app = new App();
</script>

<template>
  <main>
    <div id="bottom-nav-bar-placeholder"></div>
  </main>
  <bottom-nav-bar />
  <toaster :toaster="app.ui.toaster" />
</template>

<style lang="scss">
@import "./partials/mixins";

#app main {
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  background-color: var(--color-primary-surface);
}

#bottom-nav-bar-placeholder {
  height: var(--bottom-nav-bar-height);
}

@media screen and (min-width: 760px) {
  #content-wrapper {
    columns: 2;
  }
}
</style>
