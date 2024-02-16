<script lang="ts" setup>
import BottomNavBarItem from "./BottomNavBarItem.vue";
</script>

<template>
  <nav>
    <bottom-nav-bar-item title="Melodie" icon-id="playlist-music" />
    <bottom-nav-bar-item active title="Kompozice" icon-id="music-note-plus" />
    <bottom-nav-bar-item title="Přehrávání" icon-id="play" />
  </nav>
</template>

<style lang="scss">
nav {
  background-color: var(--color-primary-surface-top);
  height: var(--bottom-nav-bar-height);
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
}
</style>
