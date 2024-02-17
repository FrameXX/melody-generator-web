<script lang="ts" setup>
import { PropType } from "vue";
import BottomNavBarItem from "./BottomNavBarItem.vue";
import { NavItem } from "../App.vue";

const props = defineProps({
  activeItem: { type: String as PropType<NavItem>, required: true },
});

const emit = defineEmits<{
  itemClick: [item: NavItem];
}>();
</script>

<template>
  <nav>
    <bottom-nav-bar-item
      @click="emit('itemClick', 'melodies')"
      :active="props.activeItem === 'melodies'"
      title="Melodie"
      icon-id="playlist-music"
    />
    <bottom-nav-bar-item
      @click="emit('itemClick', 'composition')"
      :active="props.activeItem === 'composition'"
      title="Kompozice"
      icon-id="music-note-plus"
    />
    <bottom-nav-bar-item
      @click="emit('itemClick', 'playback')"
      :active="props.activeItem === 'playback'"
      title="Přehrávání"
      icon-id="play"
    />
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
  box-shadow: var(--box-shadow);
}
</style>
