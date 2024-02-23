<script lang="ts" setup>
import { PropType } from "vue";
import Tone from "../modules/tone";
import Oscillator from "../modules/oscillator";

const props = defineProps({
  tones: {
    type: Array as PropType<Tone[]>,
    default: [
      new Tone("C4", 261.6256),
      new Tone("C♯4", 277.1826, true),
      new Tone("D4", 293.6648),
      new Tone("D♯4", 311.127, true),
      new Tone("E4", 329.6276),
      new Tone("F4", 349.2282),
      new Tone("F♯4", 369.9944, true),
      new Tone("G4", 391.9954),
      new Tone("G♯4", 415.3047, true),
      new Tone("A4", 440.0),
      new Tone("A♯4", 466.1638, true),
      new Tone("H4", 493.8833),
      new Tone("C5", 523.2511),
      new Tone("C♯5", 554.3653, true),
      new Tone("D5", 587.3295),
      new Tone("D♯5", 622.254, true),
      new Tone("E5", 659.2551),
      new Tone("F5", 698.4565),
      new Tone("F♯5", 739.9888, true),
      new Tone("G5", 783.9909),
    ],
  },
  oscillator: { type: Object as PropType<Oscillator>, required: true },
});

const emit = defineEmits<{
  toneStart: [tone: Tone];
  toneEnd: [];
}>();

let playingToneName: null | string = null;
let activePad: null | HTMLElement = null;

function setActivePad(value: null | HTMLElement) {
  if (activePad) activePad.classList.remove("active");
  activePad = value;
  if (!activePad) return;
  activePad.classList.add("active");
}

function startTone(event: PointerEvent, tone: Tone) {
  navigator.vibrate(30);
  props.oscillator.play(tone.frequency);
  playingToneName = tone.name;

  if (!(event.target instanceof HTMLElement)) return;
  setActivePad(event.target);
}

function endTone() {
  if (!props.oscillator.isPlaying) return;

  const gainNodeLinearRampDelay = Math.min(
    props.oscillator.playbackDurationMs / 1700,
    1
  );
  props.oscillator.stopPlaying(gainNodeLinearRampDelay);
  playingToneName = null;

  setActivePad(null);
}

function transitionToTone(newTone: Tone, pad: HTMLElement) {
  props.oscillator.play(newTone.frequency);
  playingToneName = newTone.name;
  setActivePad(pad);
}

function trackTouch(event: TouchEvent) {
  if (!playingToneName) return;
  const touch = event.touches[0];
  const x = touch.clientX;
  const y = touch.clientY;
  const pad = document.elementFromPoint(x, y);
  if (!pad) return;
  if (!(pad instanceof HTMLElement)) return;

  const toneName = pad.dataset.name;
  if (!toneName) return;
  if (toneName === playingToneName) return;
  const toneFrequency = pad.dataset.frequency;
  if (!toneFrequency) return;
  const newTone = new Tone(toneName, +toneFrequency);
  transitionToTone(newTone, pad);
}

function onMouseEnter(event: MouseEvent, tone: Tone) {
  if (!playingToneName) return;
  if (tone.name === playingToneName) return;
  if (!(event.target instanceof HTMLElement)) return;
  setActivePad(event.target);
  transitionToTone(tone, event.target);
}

addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") endTone();
});
</script>

<template>
  <div
    class="tone-pad"
    @touchend="endTone()"
    @pointerup="endTone()"
    @touchmove="trackTouch($event)"
    @mouseleave="endTone()"
  >
    <div
      role="button"
      tabindex="0"
      class="tone"
      v-for="(tone, index) in props.tones"
      :key="tone.name"
      :class="`tone-${index % 12} ${tone.accented ? 'accented' : ''}`"
      :data-name="tone.name"
      :data-frequency="tone.frequency"
      @mouseenter="onMouseEnter($event, tone)"
      @pointerdown="startTone($event, tone)"
    >
      <b class="name">{{ tone.name }}</b>
      <div class="frequency">{{ tone.frequency }}Hz</div>
    </div>
  </div>
</template>

<style lang="scss">
.tone-pad {
  display: flex;
  flex-direction: column-reverse;
  width: 100%;

  .tone {
    cursor: pointer;
    overscroll-behavior: none;
    display: flex;
    user-select: none;
    background-color: var(--color-primary-accent);
    box-shadow: var(--box-shadow);
    padding: var(--spacing-medium);
    --color-primary-accent: hsl(
      var(--H-primary),
      var(--S-primary-accent),
      var(--L-accent)
    );
    --L-accent: var(--L-dark-accent);
    transition: translate var(--transition-duration-short)
      var(--transition-timing-jump);

    &:hover {
      translate: 5px;
    }

    &.active {
      translate: 10px;
    }

    &.accented {
      --L-dark-accent: 22%;
      padding: var(--spacing-small);
      font-size: var(--font-size-small);
    }

    &.tone-0 {
      --H-primary: 0;
    }

    &.tone-1 {
      --H-primary: 25;
    }

    &.tone-3 {
      --H-primary: 50;
    }

    &.tone-4 {
      --H-primary: 75;
    }

    &.tone-5 {
      --H-primary: 100;
    }

    &.tone-6 {
      --H-primary: 125;
    }

    &.tone-7 {
      --H-primary: 150;
    }

    &.tone-8 {
      --H-primary: 175;
    }

    &.tone-9 {
      --H-primary: 200;
    }

    &.tone-10 {
      --H-primary: 225;
    }

    &.tone-11 {
      --H-primary: 250;
    }

    .name {
      flex-shrink: 0;
      width: 60px;
    }
  }
}
</style>
