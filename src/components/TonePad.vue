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
});

const emit = defineEmits<{
  toneStart: [tone: Tone];
  toneEnd: [];
}>();

const osciallator = new Oscillator();

function toneFeedback(tone: Tone) {
  navigator.vibrate(30);
  osciallator.play(tone.frequency);
}
</script>

<template>
  <div
    class="tone-pad"
    @pointerleave="osciallator.stopPlaying()"
    @pointerup="osciallator.stopPlaying()"
  >
    <div
      v-for="(tone, index) in props.tones"
      :key="tone.name"
      class="tone"
      :class="`tone-${index % 12} ${tone.accented ? 'accented' : ''}`"
      @pointerdown="toneFeedback(tone)"
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

    &:active {
      translate: 2px 4px;
    }

    &.accented {
      --L-dark-accent: 22%;
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
