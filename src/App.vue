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
  <v-theme-provider>
    <v-card
      :color="statusColor"
      title="Stav připojení světla"
      :loading="app.updatingLightState.value"
      id="card-status"
      :subtitle="status"
    >
      <v-card-subtitle> </v-card-subtitle>
      <template v-slot:prepend>
        <icon :icon-id="statusIconId"></icon>
      </template>
      <v-card-actions>
        <v-btn
          @click="app.requestLightStateUpdate()"
          title="Znovu zkontrolovat stav připojení světla"
          >Znovu zkontrolovat</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-theme-provider>
</template>

<style lang="scss"></style>
