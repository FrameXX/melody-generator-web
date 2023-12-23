import { ref } from "vue";
import LightState from "./light_state";
import Message from "./message";
import UI from "./ui";

export default class App {
  private readonly ntfyTopic = "esp8266";
  public readonly ui = new UI(this);
  public lightState = new LightState(ref(true));
  private readonly eventSource = new EventSource(
    `https://ntfy.sh/${this.ntfyTopic}/sse`
  );
  public updatingLightState = ref(false);
  public lightStateUpdateTime = ref(0);

  constructor() {
    this.eventSource.addEventListener("message", this.handleServerEvent);
    this.requestLightStateUpdate();
  }

  private handleServerEvent = (event: MessageEvent) => {
    console.log(event);
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
    this.lightState = LightState.fromMessage(message);
    this.updatingLightState.value = false;
    this.lightStateUpdateTime.value = Math.trunc(Date.now() / 1000);
  }

  get postUrl() {
    return `https://ntfy.sh/${this.ntfyTopic}`;
  }

  public requestLightStateUpdate() {
    this.updatingLightState.value = true;
    const lightStateUpdateRequest = new Message(0);
    this.postMessage(lightStateUpdateRequest);
  }

  private postMessage(message: Message) {
    fetch(this.postUrl, {
      method: "POST",
      body: message.toString(),
    });
  }
}
