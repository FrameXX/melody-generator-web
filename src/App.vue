<script lang="ts" setup>
import Toaster from "./components/Toaster.vue";
import App from "./modules/app";
import TouchArea from "./components/TouchArea.vue";
import Icon from "./components/Icon.vue";

const app = new App();
</script>

<template>
  <main>
    <touch-area />
    <div id="action-bar">
      <button>
        <icon icon-id="record" />
      </button>
      <button>
        <icon icon-id="stop" />
      </button>
      <button>
        <icon icon-id="play" />
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

#action-bar {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 90px;
  background-color: var(--color-primary-surface-top);
  box-shadow: var(--box-shadow);
}
</style>
