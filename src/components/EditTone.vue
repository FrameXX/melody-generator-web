<script lang="ts" setup></script>

<template>
  <div class="edit-tone"></div>
</template>

<style lang="scss">
@import "../partials/mixins";

.edit-tone {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: calc(100% - var(--melody-visualization-height));
  background-color: var(--color-primary-surface-top);
  border-radius: var(--border-radius) var(--border-radius) 0 0;
  box-shadow: var(--box-shadow);
}
</style>
