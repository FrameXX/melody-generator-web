<script lang="ts" setup>
import Toaster from "./components/Toaster.vue";
import App from "./modules/app";
import BottomNavBar from "./components/BottomNavBar.vue";
import MelodiesTab from "./components/MelodiesTab.vue";
import CompositionTab from "./components/CompositionTab.vue";
import PlaybackTab from "./components/PlaybackTab.vue";
import { ref } from "vue";

const app = new App();

export type NavItem = "melodies" | "composition" | "playback";

const activeNavItem = ref<NavItem>("composition");

function onNavItemClick(item: NavItem) {
  activeNavItem.value = item;
}
</script>

<template>
  <main>
    <melodies-tab v-show="activeNavItem === 'melodies'" />
    <composition-tab v-show="activeNavItem === 'composition'" />
    <playback-tab v-show="activeNavItem === 'playback'" />
    <div id="bottom-nav-bar-placeholder"></div>
  </main>
  <bottom-nav-bar :active-item="activeNavItem" @item-click="onNavItemClick" />
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
