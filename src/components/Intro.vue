<script lang="ts" setup>
import Backdrop from "./Backdrop.vue";
import Icon from "./Icon.vue";

const props = defineProps({ open: { type: Boolean, default: false } });

const emit = defineEmits(["understand"]);
</script>

<template>
  <Backdrop v-show="props.open" />
  <Transition name="slide-up">
    <div class="fragment" v-show="props.open">
      <div class="content">
        <h2>Jak na to?</h2>
        <p>
          Tato webová aplikace vám umožní si nahrát jednoduchou melodii a poslat
          ji do bzučáku, který ji pak bude hrát dokola.
        </p>
        <p>Dole lze vidět popisky funkcí tlačítek.</p>
        <p>
          Microcontroller má omezenou paměť a může přijímat melodie pouze do
          určité délky, a proto mohou být delší nahrávání automaticky ukončena,
          aby se předešlo pádu systému.
        </p>
        <button id="button-understand" @click="emit('understand')">
          <icon side icon-id="check-all" />Chápu to
        </button>
      </div>
      <div id="actions-explantion">
        <div class="explanation">
          <span class="description"> Začít/Ukončit nahrávání </span>
          <button title="Spustit nahrávání">
            <div id="record-icon" class="icon"></div>
          </button>
        </div>
        <div class="explanation">
          <span class="description"> Přehrát nahratou melodii </span>
          <button title="přehrát">
            <icon icon-id="play" />
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss">
@import "../partials/mixins";

#actions-explantion {
  width: 100%;
  width: -moz-available;
  width: -webkit-fill-available;
  width: fill-available;
  width: -webkit-fill-available;
  display: flex;
  flex-direction: column-reverse;
  position: absolute;
  right: 0;
  bottom: 0;
  padding: var(--spacing-medium);
  gap: var(--spacing-medium);

  button {
    flex-shrink: 0;
    @include square-size(40px);
    padding: var(--spacing-small);
    margin: 0;
  }
}

.explanation {
  display: flex;
  align-items: center;
  justify-content: end;
}

.description {
  width: 100%;
}

#button-understand {
  left: 0;
  right: 0;
  margin: auto;
  position: absolute;
  width: fit-content;
  margin-top: var(--spacing-big);
}
</style>
