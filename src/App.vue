<script lang="ts" setup>
import Toaster from "./components/Toaster.vue";
import App from "./modules/app";
import EditTone from "./components/EditTone.vue";
import MelodyVisualisation from "./components/MelodyVisualisation.vue";
import MenuButton from "./components/MenuButton.vue";

const app = new App();
</script>

<template>
  <main>
    <melody-visualisation />
    <edit-tone />
  </main>
  <menu-button />
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

@media screen and (min-width: 760px) {
  #content-wrapper {
    columns: 2;
  }
}
</style>
