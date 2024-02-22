<script lang="ts" setup>
// @ts-ignore
import iconUrl from "./assets/img/icons.svg";
import Toaster from "./components/Toaster.vue";
import App from "./modules/app";
import Icon from "./components/Icon.vue";
import TonePad from "./components/TonePad.vue";
import { computed } from "vue";
const app = new App();

const recordButtonTitle = computed(() => {
  return app.recordingOscillator.value
    ? "Zastavit nahrávání"
    : "Spustit nahrávání";
});

const playButtonVisible = computed(() => {
  return !app.recordingOscillator.value && app.recordedMelody.value;
});
</script>

<template>
  <main>
    <div id="tone-pad-wrapper">
      <tone-pad :oscillator="app.oscillator" />
    </div>
    <div id="actions">
      <button
        :title="recordButtonTitle"
        @click="app.toggleOscillatorRecording()"
      >
        <div
          id="record-icon"
          class="icon"
          :class="{ recording: app.recordingOscillator.value }"
        ></div>
      </button>
      <transition name="scale">
        <button v-show="playButtonVisible" title="přehrát">
          <icon icon-id="play" />
        </button>
      </transition>
    </div>
  </main>
  <toaster :toaster="app.toaster" />
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
    @include square-size(40px);
    padding: var(--spacing-small);
    margin: 0;
  }
}

#tone-pad-wrapper {
  width: 100%;
  height: 100%;
  @include flex-center;
}

#record-icon {
  @include square-size(var(--font-size-medium));
  background-color: currentColor;
  border-radius: 50%;
  transition: border-radius var(--transition-duration-short) linear;

  &.recording {
    border-radius: 0;
  }
}

.scale-enter-active,
.scale-leave-active {
  transition: scale var(--transition-duration-short)
    var(--transition-timing-jump);
}

.scale-enter-from,
.scale-leave-to {
  scale: 0;
}
</style>
