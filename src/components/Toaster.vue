<script lang="ts" setup>
import { PropType } from "vue";
import Toast from "./Toast.vue";
import Toaster from "../modules/Toaster/toaster";

const props = defineProps({
  toaster: { type: Object as PropType<Toaster>, required: true },
});
</script>

<template>
  <div class="toaster flex-column flex-center">
    <transition-group name="slide-up">
      <toast
        v-for="toast in props.toaster.toasts.value"
        @click="props.toaster.remove(toast.id)"
        :key="toast.id"
        :toaster="props.toaster"
        :toast="toast"
      />
    </transition-group>
  </div>
</template>

<style lang="scss">
.toaster {
  align-items: center;
  position: fixed;
  display: flex;
  flex-direction: column-reverse;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  padding: var(--spacing-small);
  pointer-events: none;
}

// [Group] Slide up
.slide-up-move,
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform var(--transition-duration-medium)
      var(--transition-timing-jump),
    opacity var(--transition-duration-medium) linear;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

.slide-up-leave-active {
  position: absolute;
}
</style>
