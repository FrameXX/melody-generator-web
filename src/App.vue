<script setup lang="ts">
import App from "./modules/app";
import Icon from "./components/Icon.vue";
import Toast from "./components/Toast.vue";
import { computed } from "vue";

const app = new App();

const lightStateInvalid = computed(() => {
  app.lightStateUpdatedSecondsAgo.value >
    app.settings.lightStateValidityTimeoutS;
});

const statusIconId = computed(() => {
  if (app.checkingLightState.value) return "sync";
  if (app.serverConnectionFailed.value) return "server-network-off";
  if (app.lightStateCheckTimedOut.value) return "lightbulb-alert-outline";
  if (app.lightStateUpdateTime.value === -1 || lightStateInvalid)
    return "lightbulb-question-outline";
  return "check-circle-outline";
});
const statusText = computed(() => {
  if (app.checkingLightState.value) return "Probíhá kontrola";
  if (app.serverConnectionFailed.value) return "Připojení k serveru selhalo";
  if (app.lightStateCheckTimedOut.value) return "Světlo neodpovídá";
  if (app.lightStateUpdateTime.value === -1) return "Neznámý";
  if (lightStateInvalid) return "Platnost stavu vypršela";
  return "Připojeno";
});
const statusColor = computed(() => {
  if (app.lightStateUpdateTime.value === -1 || lightStateInvalid)
    return "error";
  return "success";
});

const lastTimeUpdateText = computed(() => {
  if (app.lightStateUpdateTime.value === -1) return "Není k dispozici.";

  const minutesAgo = Math.trunc(app.lightStateUpdatedSecondsAgo.value / 60);

  if (minutesAgo === 0) {
    return "Naposledy aktualizováno před okamžikem.";
  } else if (minutesAgo === 1) {
    return "Naposledy aktualizováno před 1 minutou.";
  } else {
    return `Naposledy aktualizováno před ${minutesAgo} minutami.`;
  }
});

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
          :loading="app.checkingLightState.value"
          id="card-status"
          :subtitle="statusText"
          :text="lastTimeUpdateText"
        >
          <template v-slot:prepend>
            <icon size="big" :icon-id="statusIconId" />
          </template>
          <v-card-actions>
            <v-btn
              :disabled="app.checkingLightState.value"
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
        <v-btn
          :disabled="app.applyingLightState.value"
          @click="app.applyLightState()"
          title="Poslat nastavení"
          color="primary"
          size="large"
          id="button-apply-state"
        >
          <template v-slot:prepend>
            <icon icon-id="send-outline" />
          </template>
          Aplikovat nastavení
        </v-btn>
      </div>
    </main>

    <div id="toast-stack" class="flex-column flex-center">
      <transition-group name="slide-up">
        <toast
          v-for="toast in app.ui.toasts.value"
          :key="toast.id"
          :toast="toast"
        />
      </transition-group>
    </div>
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

#toast-stack {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  margin: auto;

  .toast {
    margin: var(--spacing-medium);
  }
}

// [Group] Slide down
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
