<script lang="ts" setup>
// @ts-ignore
import iconUrl from "./assets/img/icons.svg";
import Toaster from "./components/Toaster.vue";
import App from "./modules/app";
import Icon from "./components/Icon.vue";
import TonePad from "./components/TonePad.vue";
const app = new App();
</script>

<template>
  <main>
    <div id="tone-pad-wrapper">
      <tone-pad />
    </div>
    <div id="actions">
      <button title="">
        <icon icon-id="record" />
      </button>
      <button>
        <icon title="přehrát" icon-id="play" />
      </button>
    </div>
  </main>
  <toaster :toaster="app.ui.toaster" />
</template>

<style lang="scss">
@import "./partials/mixins";

main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--color-primary-surface);
}

#actions {
  display: flex;
  flex-direction: column-reverse;
  position: fixed;
  right: 0;
  bottom: 0;
  padding: var(--spacing-medium);
  gap: var(--spacing-medium);

  button {
    padding: var(--spacing-small);
    margin: 0;
  }
}

#tone-pad-wrapper {
  width: 100%;
  height: 100%;
  @include flex-center;
}
</style>
