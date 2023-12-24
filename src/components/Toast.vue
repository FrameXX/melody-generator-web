import { PropType, computed } from 'vue';
<script lang="ts" setup>
import { PropType, computed } from "vue";
import Toast from "../modules/toast";
import Icon from "./Icon.vue";

const props = defineProps({
  toast: { type: Object as PropType<Toast>, required: true },
});

const bgClass = computed(() => {
  switch (props.toast.type) {
    case "success":
      return "bg-success";
    case "error":
      return "bg-error";
    default:
      return "";
  }
});
</script>

<template>
  <div
    @click="props.toast.hide()"
    class="toast rounded flex-center elevation-5 v-card--variant-elevated"
    :class="bgClass"
  >
    <icon v-if="props.toast.iconId" :icon-id="props.toast.iconId" />
    <div>
      {{ props.toast.message }}
    </div>
  </div>
</template>

<style lang="scss">
.toast {
  cursor: pointer;
  padding: var(--spacing-big);
  width: fit-content;
  background-color: rgb(var(--v-theme-surface));
  color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity));
  border: 3px solid currentColor;

  .icon {
    margin: 0;
    margin-right: var(--spacing-small);
  }
}
</style>
