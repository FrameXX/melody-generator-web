<script lang="ts" setup>
import defaultSourceFile from "../assets/img/icon_sprite.svg";

const props = defineProps({
  iconId: { type: String, required: true },
  title: { type: String },
  sourceFile: { type: String, default: defaultSourceFile },
});
</script>

<template>
  <svg role="img" class="icon" aria-hidden="true">
    <title v-if="title">{{ props.title }}</title>
    <use :href="`${props.sourceFile}#${props.iconId}`"></use>
  </svg>
</template>

<style lang="scss">
.icon {
  aspect-ratio: 1;
  width: 32px;
  height: 32px;
  fill: var(--color-primary-text);
  color: var(--color-primary-text);
  margin: var(--spacing-small);

  &.small {
    width: 24px;
    height: 24px;
  }

  &.big {
    width: 40px;
    height: 40px;
  }

  &.huge {
    width: 56px;
    height: 56px;
  }

  &.enormous {
    width: 80px;
    height: 80px;
  }
}
</style>
