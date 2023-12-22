<script setup lang="ts">
import Icon from "./Icon.vue";
</script>

<template>
  <div id="screen-connecting" class="screen flex flex-center flex-column">
    <icon class="enormous" icon-id="wifi-arrow-up-down" />
    <div class="title">Kontrola stavu připojení světla...</div>
    <v-progress-linear class="progress" indeterminate></v-progress-linear>
  </div>
</template>

<style lang="scss">
#screen-connecting {
  padding: var(--spacing-huge);
  text-align: center;

  .title {
    font-size: var(--font-size-large);
  }

  .progress {
    max-width: 500px;
    margin: var(--spacing-medium) 0;
  }
}
</style>
