<script lang="ts" setup>
import { PropType } from "vue";
import Icon from "./Icon.vue";
import Toast from "../modules/Toaster/toast";

const props = defineProps({
  toast: { type: Object as PropType<Toast>, required: true },
});
</script>

<template>
  <div
    :class="'toast ' + props.toast.type"
    role="alert"
    aria-live="assertive"
    tabindex="0"
  >
    <icon v-if="props.toast.iconId" :icon-id="props.toast.iconId" side />
    {{ props.toast.message }}
    <div class="close-overlay">
      <icon icon-id="close" side />
      DISMISS
    </div>
  </div>
</template>

<style lang="scss">
@import "../partials/mixins";

.toast {
  @include flex-center;
  @include shadow;
  @include round-border;
  @include clickable;
  @include no-overrender;
  @include no-overflow;
  @include no-select;
  pointer-events: all;
  margin: var(--spacing-small);
  position: relative;
  padding: var(--spacing-medium);
  border-width: var(--border-width);
  border-style: solid;

  &.info {
    border-color: var(--color-primary-accent);
    background-color: var(--color-primary-surface-top);
    color: var(--color-primary-text);

    .close-overlay {
      background-color: var(--color-primary-surface-top);
    }
  }

  &.error {
    background-color: var(--color-error-surface-top);
    color: var(--color-error-text);
    border-color: var(--color-error-accent);

    .close-overlay {
      background-color: var(--color-error-surface-top);
    }
  }

  .close-overlay {
    @include flex-center;
    @include stretch;
    position: fixed;
    opacity: 0;
    transition: opacity var(--transition-duration-medium) linear;

    &:hover {
      opacity: 0.9;
    }
  }
}
</style>
