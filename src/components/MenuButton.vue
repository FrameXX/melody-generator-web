<script lang="ts" setup>
import Icon from "./Icon.vue";
</script>

<template>
  <button id="button-menu" type="button">
    <icon icon-id="menu-up-outline" />
  </button>
</template>

<style>
#button-menu {
  --size: 50px;
  position: fixed;
  bottom: var(--spacing-medium);
  right: var(--spacing-medium);
  width: var(--size);
  height: var(--size);
  padding: var(--spacing-tiny);
}
</style>
