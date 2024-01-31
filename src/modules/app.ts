import { reactive, ref, watch } from "vue";
import LightState from "./light_state";
import UI from "./ui";
import NtfyTopicClient from "./ntfy_topic_client";
import MsgCmdChannelClient from "./msg_cmd_channel_client";

export default class App {
  public readonly ui = new UI();
  public lightState = reactive(new LightState(this));
  public readonly ntfyTopic = ref("smart-light-channel");
  private channel: MsgCmdChannelClient | undefined;

  constructor() {
    if (!navigator.cookieEnabled) return;
    const ntfyTopicData = localStorage.getItem("ntfyTopic");

    if (ntfyTopicData) this.ntfyTopic.value = ntfyTopicData;

    watch(this.ntfyTopic, (newValue) => {
      localStorage.setItem("ntfyTopic", newValue);
    });
  }

  public async requestChannelSetup() {
    if (this.ui.connecting.value) {
      this.ui.toaster.bake(
        "Pokus o připojení již probíhá. Pro zrušení znovu načtěte stránku.",
        "cancel",
        "error"
      );
      return;
    }
    this.ui.connecting.value = true;

    this.ui.toaster.bake("Získávání informací ze serveru.", "download");
    const ntfyTopicClient = new NtfyTopicClient(this.ntfyTopic.value);
    const channel = new MsgCmdChannelClient(ntfyTopicClient);
    const connected = await this.lightState.updateFromMsgCmdChannel(channel);

    if (connected) {
      this.ui.toaster.bake("Informace úspěšně načteny.", "wifi-check");
      this.ui.connected.value = true;
    }

    this.ui.connecting.value = false;
  }

  private handleReceivedMessage(message: string) {
    console.log(message);
  }
}
