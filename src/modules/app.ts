import { ref } from "vue";
import LightState from "./light_state";
import Message from "./message";
import UI from "./ui";

export default class App {
  private readonly ntfyTopic = "framexx";
  public readonly ui = new UI(this);
  public lightState = new LightState(ref(true));
  private readonly eventSource = new EventSource(
    `https://ntfy.sh/${this.ntfyTopic}/sse`
  );
  public updatingLightState = ref(false);
  public lightStateUpdateTime = ref(0);
  public settings = {
    lightStateCheckTimeoutMs: 12000,
  };
  public lightStateCheckTimedOut = ref(false);
  public serverConnectionFailed = ref(false);

  constructor() {
    this.eventSource.addEventListener("message", this.handleServerEvent);
    // this.checkLightState();
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
    this.updatingLightState.value = false;
    this.lightStateCheckTimedOut.value = false;
    this.lightStateUpdateTime.value = Math.trunc(Date.now() / 1000);
  }

  get postUrl() {
    return `https://ntfy.sh/${this.ntfyTopic}`;
  }

  public async checkLightState() {
    if (this.updatingLightState.value) return;

    const lightStateUpdateRequest = new Message(0);
    this.serverConnectionFailed.value = !(await this.postMessage(
      lightStateUpdateRequest
    ));
    if (this.serverConnectionFailed.value) return;

    setTimeout(
      this.onLightStateCheckTimeout,
      this.settings.lightStateCheckTimeoutMs
    );

    this.updatingLightState.value = true;
  }

  private onLightStateCheckTimeout = () => {
    this.updatingLightState.value = false;
    this.lightStateCheckTimedOut.value = true;
  };

  private async postMessage(message: Message) {
    const response = await fetch(this.postUrl, {
      method: "POST",
      body: message.toString(),
    });
    return response.ok;
  }
}
