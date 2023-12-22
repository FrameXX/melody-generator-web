import LightState from "./light_state";

export default class App {
  private readonly ntfyTopic = "esp8266";
  private readonly lightState = this.requestLightState();

  constructor() {}

  get postUrl() {
    return `https://ntfy.sh/${this.ntfyTopic}`;
  }

  private postMessage(message: string) {
    fetch(this.postUrl, {
      method: "POST",
      body: message,
    });
  }

  private messageToValues(message: string): number[] {
    const data = message.split(" ");
    const values = data.map((value) => +value);
    return values;
  }

  private requestLightState(): Promise<LightState> {
    this.postMessage("0");

    return new Promise((resolve) => {
      const channel = new EventSource(`https://ntfy.sh/${this.ntfyTopic}/sse`);

      channel.addEventListener("message", (message) => {
        if (typeof message.data !== "string")
          throw new TypeError("Received message is not a string.");

        const values = this.messageToValues(message.data);
        if (values[0] !== 1) return;

        const lightState = LightState.fromValues(values);
        resolve(lightState);
      });
    });
  }
}
