<script setup lang="ts">
import App from "./modules/app";
import Icon from "./components/Icon.vue";
import { computed } from "vue";

const app = new App();

const statusIconId = computed(() => {
  if (app.updatingLightState.value) return "wifi-refresh";
  if (app.lightStateUpdateTime.value === 0) return "wifi-remove";
  return "wifi-check";
});
const status = computed(() => {
  if (app.updatingLightState.value) return "Probíhá aktualizace";
  if (app.lightStateUpdateTime.value === 0) return "Neznámý";
  return "Připojeno";
});
const statusColor = computed(() => {
  if (app.lightStateUpdateTime.value === 0) return "error";
  return "success";
});
</script>

<template>
  <!-- RELATIVE -->
  <v-card
    :color="statusColor"
    title="Stav připojení světla"
    :loading="app.updatingLightState.value"
    id="card-status"
    :subtitle="status"
  >
    <v-card-subtitle> </v-card-subtitle>
    <template v-slot:prepend>
      <icon size="big" :icon-id="statusIconId" />
    </template>
    <v-card-actions>
      <v-btn
        @click="app.requestLightStateUpdate()"
        title="Znovu zkontrolovat stav připojení světla"
        >Znovu zkontrolovat</v-btn
      >
    </v-card-actions>
  </v-card>

  <!-- FIXED -->
  <v-btn color="primary" size="large" id="button-apply-changes">
    <template v-slot:prepend>
      <icon icon-id="send-outline" />
    </template>
    Aplikovat změny
  </v-btn>
</template>

<style lang="scss">
#button-apply-changes {
  position: fixed;
  right: var(--spacing-big);
  bottom: var(--spacing-big);
}
</style>
