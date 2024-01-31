<script lang="ts" setup>
import { PropType, onMounted, ref, watch } from "vue";
import App from "../modules/app";
import Icon from "./Icon.vue";
import SpinnerWifiFade from "./Spinner/SpinnerWifiFade.vue";
import Backdrop from "./Backdrop.vue";

const props = defineProps({
  app: { type: Object as PropType<App>, required: true },
});

const connectButtonEnabled = ref(false);

watch(props.app.ntfyTopic, updateConnectButtonEnabled);

function updateConnectButtonEnabled() {
  connectButtonEnabled.value = getNtfyTopicInputValidity();
}

function getNtfyTopicInputValidity() {
  const ntfyTopicInput = document.getElementById(
    "input-ntfy-channel-name"
  ) as HTMLInputElement | null;
  if (!ntfyTopicInput) {
    throw new Error("Ntfy topic input element not found in DOM.");
  }
  return ntfyTopicInput.validity.valid;
}

onMounted(() => {
  updateConnectButtonEnabled();
});
</script>

<template>
  <Backdrop v-show="!props.app.ui.connected.value" />
  <Transition name="slide-up">
    <div class="fragment" id="setup" v-show="!props.app.ui.connected.value">
      <div class="content">
        <h1>Vítejte v webovém ovladači světla.</h1>
        <p>
          Nejprve je třeba zadat název kanálu/tématu serveru ntfy na které je
          světlo připojené, nebo můžete zkusit použít výchozí hodnotu. (jsou
          povolena pouze malá a velká písmena anglické abecedy, čísla,
          podtržítka a pomlčky.)
        </p>
        <input
          id="input-ntfy-channel-name"
          type="text"
          pattern="(?:[a-z]|[A-Z]|_|-)+?$"
          required
          placeholder="Název kanálu/tématu serveru ntfy"
          v-model="props.app.ntfyTopic.value"
        />
        <button
          :disabled="!connectButtonEnabled"
          type="button"
          title="Připojit"
          @click="props.app.requestChannelSetup()"
        >
          <icon v-show="!props.app.ui.connecting.value" icon-id="wifi" side />
          <spinner-wifi-fade v-show="props.app.ui.connecting.value" />
          Připojit
        </button>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss">
@import "../partials/mixins";

#setup {
  @include flex-center;
  text-align: center;

  .content {
    @include flex-center;
    flex-direction: column;
  }
}

#input-ntfy-channel-name {
  width: -webkit-fill-available;
  max-width: 450px;
}
</style>
