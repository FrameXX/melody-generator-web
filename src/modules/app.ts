import { ref } from "vue";
import LightState from "./light_state";
import Message from "./message";
import UI from "./ui";

export default class App {
  private readonly ntfyTopic = "framexx";
  private readonly storageKey = "light-controller";
  public readonly ui = new UI();
  public lightState = new LightState(ref(true));
  private readonly eventSource = new EventSource(
    `https://ntfy.sh/${this.ntfyTopic}/sse`
  );
  public checkingLightState = ref(false);
  public applyingLightState = ref(false);
  public lightStateUpdateTime = ref(-1);
  public lightStateUpdatedSecondsAgo = ref(-1);
  private lightStateCheckTimeout: number | undefined;
  public settings = {
    postTimeoutMs: 6000,
    lightStateValidityTimeoutS: 240,
    lightStateCheckTimeoutMs: 12000,
    lightStateApplyTimeoutMs: 3000,
  };
  public lightStateCheckTimedOut = ref(false);
  public serverConnectionFailed = ref(false);

  constructor() {
    this.restoreLightState();
    this.eventSource.addEventListener("message", this.handleServerEvent);
    this.checkLightState();

    setInterval(() => {
      this.lightStateUpdatedSecondsAgo.value =
        this.lightStateUpdateTime.value === -1
          ? -1
          : Math.trunc(Date.now() / 1000) - this.lightStateUpdateTime.value;
      if (
        this.lightStateUpdatedSecondsAgo.value >
        this.settings.lightStateValidityTimeoutS
      )
        if (
          !this.serverConnectionFailed.value &&
          !this.checkingLightState.value
        )
          this.checkLightState();
    });
  }

  private restoreLightState() {
    if (!navigator.cookieEnabled) return;
    const lightStateStr = localStorage.getItem(
      `${this.storageKey}-light-state`
    );
    if (!lightStateStr) return;
    this.lightState = LightState.fromMessage(Message.fromString(lightStateStr));
    const lightStateUpdateTimeStr = localStorage.getItem(
      `${this.storageKey}-light-state-update-time`
    );
    if (!lightStateUpdateTimeStr) return;
    this.lightStateUpdateTime.value = +lightStateUpdateTimeStr;
  }

  private saveLightState() {
    if (!navigator.cookieEnabled) return;
    const lightStateStr = this.lightState.toMessage().toString();
    localStorage.setItem(`${this.storageKey}-light-state`, lightStateStr);
  }

  private saveLightStateUpdateTime() {
    if (!navigator.cookieEnabled) return;
    const lightStateUpdateTimeStr = this.lightStateUpdateTime.value.toString();
    localStorage.setItem(
      `${this.storageKey}-light-state-update-time`,
      lightStateUpdateTimeStr
    );
  }

  public async applyLightState() {
    this.applyingLightState.value = true;

    const ligthStateMessage = this.lightState.toMessage();
    const requestSuccessful = await this.postMessage(ligthStateMessage);

    if (requestSuccessful) {
      this.ui.createToast(
        "Nastavení úspěšně posláno.",
        "check-circle-outline",
        "success"
      );
      this.saveLightState();
      setTimeout(
        () => (this.applyingLightState.value = false),
        this.settings.lightStateApplyTimeoutMs
      );
    } else {
      this.ui.createToast(
        "Připojení k serveru selhalo.",
        "server-network-off",
        "error"
      );
      this.applyingLightState.value = false;
    }
  }

  private handleServerEvent = (event: MessageEvent) => {
    const eventData = JSON.parse(event.data);
    const messageStr = eventData.message as string;
    const message = Message.fromString(messageStr);
    this.handleMessage(message);
  };

  private handleMessage(message: Message) {
    if (message.id === 1) {
      this.updateLightStateFromMessage(message);
    }
  }

  private updateLightStateFromMessage(message: Message) {
    this.lightState.updateFromMessage(message);
    this.checkingLightState.value = false;
    if (this.lightStateCheckTimeout) clearTimeout(this.lightStateCheckTimeout);
    this.lightStateCheckTimedOut.value = false;
    this.lightStateUpdateTime.value = Math.trunc(Date.now() / 1000);
    this.saveLightState();
    this.saveLightStateUpdateTime();
  }

  get postUrl() {
    return `https://ntfy.sh/${this.ntfyTopic}`;
  }

  public async checkLightState() {
    this.checkingLightState.value = true;

    const lightStateUpdateRequestMessage = new Message(0);
    this.serverConnectionFailed.value = !(await this.postMessage(
      lightStateUpdateRequestMessage
    ));
    if (this.serverConnectionFailed.value) {
      this.checkingLightState.value = false;
      return;
    }

    this.lightStateCheckTimeout = setTimeout(
      this.onLightStateCheckTimeout,
      this.settings.lightStateCheckTimeoutMs
    );
  }

  private onLightStateCheckTimeout = () => {
    this.checkingLightState.value = false;
    this.lightStateCheckTimedOut.value = true;
  };

  private async postMessage(message: Message) {
    let response;
    try {
      response = await fetch(this.postUrl, {
        method: "POST",
        body: message.toString(),
      });
    } catch (error) {
      return false;
    }
    return response.ok;
  }
}
