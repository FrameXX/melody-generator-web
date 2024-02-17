<script lang="ts" setup>
import { PropType } from "vue";
import NoteFrequencyRules from "../modules/note_frequency_rules";

const props = defineProps({
  noteFrequencyRules: {
    type: Object as PropType<NoteFrequencyRules>,
    required: true,
  },
});
</script>

<template>
  <div id="touch-area"></div>
</template>

<style lang="scss">
#touch-area {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
</style>
