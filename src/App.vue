<script setup lang="ts">
import App from "./modules/app";
import Icon from "./components/Icon.vue";
import { computed, ref } from "vue";
import { watch } from "vue";

const app = new App();

const statusIconId = computed(() => {
  if (app.updatingLightState.value) return "wifi-refresh";
  if (app.lightStateUpdateTime.value === 0) return "wifi-remove";
  return "wifi-check";
});
const statusText = computed(() => {
  if (app.updatingLightState.value) return "Probíhá kontrola";
  if (app.serverConnectionFailed.value) return "Připojení k serveru selhalo";
  if (app.lightStateCheckTimedOut.value) return "Světlo neodpovídá";
  if (app.lightStateUpdateTime.value === 0) return "Neznámý";
  return "Připojeno";
});
const statusColor = computed(() => {
  if (app.lightStateUpdateTime.value === 0) return "error";
  return "success";
});

const lastTimeUpdateText = ref("");
watch(app.lightStateUpdateTime, updateLastTimeUpdateText);
setInterval(updateLastTimeUpdateText, 1000);
updateLastTimeUpdateText();
function updateLastTimeUpdateText() {
  if (app.lightStateUpdateTime.value === 0) {
    lastTimeUpdateText.value = "Žádný stav nezaznamenán.";
    return;
  }

  const secondsAgo =
    Math.trunc(Date.now() / 1000) - app.lightStateUpdateTime.value;
  const minutesAgo = Math.trunc(secondsAgo / 60);

  if (minutesAgo === 1) {
    lastTimeUpdateText.value = "Naposledy aktualizováno před okamžikem.";
  } else if (minutesAgo === 1) {
    lastTimeUpdateText.value = "Naposledy aktualizováno před 1 minutou.";
  } else {
    lastTimeUpdateText.value = `Naposledy aktualizováno před ${minutesAgo} minutami.`;
  }
}

const powerSwicthSubtitle = computed(() => {
  return app.lightState.lightEnabled ? "Světlo zapnuto" : "Světlo vypnuto";
});
</script>

<template>
  <v-app>
    <main>
      <div id="content-wrapper">
        <!-- RELATIVE -->
        <v-card
          :color="statusColor"
          title="Stav připojení světla"
          :loading="app.updatingLightState.value"
          id="card-status"
          :subtitle="statusText"
          :text="lastTimeUpdateText"
        >
          <template v-slot:prepend>
            <icon size="big" :icon-id="statusIconId" />
          </template>
          <v-card-actions>
            <v-btn
              @click="app.checkLightState()"
              title="Znovu zkontrolovat stav připojení světla"
              >Znovu zkontrolovat</v-btn
            >
          </v-card-actions>
        </v-card>
        <v-card title="Hlavní vypínač" :subtitle="powerSwicthSubtitle">
          <template v-slot:prepend>
            <icon size="big" icon-id="power" />
          </template>
          <template v-slot:append>
            <v-switch
              title="Přepnout hlavní vypínač"
              hide-details
              color="primary"
              v-model="app.lightState.lightEnabled.value"
              inset
            />
          </template>
        </v-card>

        <!-- FIXED -->
        <v-btn color="primary" size="large" id="button-apply-state">
          <template v-slot:prepend>
            <icon icon-id="send-outline" />
          </template>
          Aplikovat nastavení
        </v-btn>
      </div>
    </main>
  </v-app>
</template>

<style lang="scss">
.v-application {
  padding: var(--spacing-medium);
}

#app main {
  text-align: center;
  display: flex;
  justify-content: center;
}

#content-wrapper {
  max-width: 960px;
  width: -webkit-fill-available;
}

@media screen and (min-width: 760px) {
  #content-wrapper {
    columns: 2;
  }
}

.v-card {
  margin-top: var(--spacing-medium);
  text-align: left;
}

.v-card:first-child {
  margin-top: 0;
}

.v-card-item__prepend {
  display: flex;
  justify-content: center;
  align-items: center;
}

#button-apply-state {
  position: fixed;
  right: var(--spacing-big);
  bottom: var(--spacing-big);
}
</style>
