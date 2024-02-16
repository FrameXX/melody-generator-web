<script lang="ts" setup>
import Icon from "./Icon.vue";

const props = defineProps({
  iconId: { type: String, required: true },
  title: { type: String, require: true },
  active: { type: Boolean, default: false },
});
</script>

<template>
  <div
    :class="{ active: props.active }"
    class="item-bottom-nav-bar"
    role="button"
    tabindex="0"
  >
    <icon :icon-id="props.iconId" />
    <div>{{ props.title }}</div>
  </div>
</template>

<style lang="scss">
@import "../partials/mixins";

.item-bottom-nav-bar {
  @include flex-center;
  @include clickable;
  width: 100%;
  padding: var(--spacing-small);
  flex-direction: column;
  font-size: var(--font-size-small);

  &.active {
    transform: scale(1.1);
    color: var(--color-primary-accent);
  }
}
</style>
