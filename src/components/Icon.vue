<script lang="ts" setup>
import iconsUrl from "../assets/img/icons.svg";

const props = defineProps({
  iconId: { type: String, required: true },
  side: { type: Boolean, default: false },
  big: { type: Boolean, default: false },
  sourceFile: { type: String, default: iconsUrl },
  title: { type: String, required: false },
});
</script>

<template>
  <svg
    class="icon"
    :class="{ side: props.side, big: props.big }"
    aria-hidden="true"
  >
    <title v-if="title">{{ props.title }}</title>
    <use :href="`${props.sourceFile}#${props.iconId}`"></use>
  </svg>
</template>

<style lang="scss">
@import "../partials/mixins";

.icon {
  @include no-select;
  @include no-shrink;
  margin: var(--spacing-tiny);
  width: var(--font-size-huge);
  height: var(--font-size-huge);
  display: inline;
  fill: currentColor;

  &.side {
    margin: var(--spacing-tiny) var(--spacing-medium) var(--spacing-tiny) 0;
  }

  &.big {
    width: var(--font-size-enormous);
    height: var(--font-size-enormous);

    &.side {
      margin: var(--spacing-tiny) var(--spacing-big) var(--spacing-tiny) 0;
    }
  }
}
</style>
