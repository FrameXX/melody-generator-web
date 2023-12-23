<script lang="ts" setup>
import { PropType } from "vue";
import defaultSourceFile from "../assets/img/icon_sprite.svg";

const props = defineProps({
  size: {
    type: String as PropType<"small" | "medium" | "big" | "huge" | "enormous">,
    default: "medium",
  },
  iconId: { type: String, required: true },
  title: { type: String },
  sourceFile: { type: String, default: defaultSourceFile },
});
</script>

<template>
  <svg role="img" class="icon" :class="props.size" aria-hidden="true">
    <title v-if="title">{{ props.title }}</title>
    <use :href="`${props.sourceFile}#${props.iconId}`"></use>
  </svg>
</template>

<style lang="scss">
.icon {
  aspect-ratio: 1;
  width: 24px;
  height: 24px;
  fill: currentColor;
  color: currentColor;
  margin: var(--spacing-small);

  &.small {
    width: 16px;
    height: 16px;
  }

  &.big {
    width: 32px;
    height: 32px;
  }

  &.huge {
    width: 48px;
    height: 48px;
  }

  &.enormous {
    width: 72px;
    height: 72px;
  }
}

.v-btn .icon {
  margin: 0;
}
</style>
