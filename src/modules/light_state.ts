import { Ref, ref } from "vue";
import Message from "./message";

export default class LightState {
  constructor(public lightEnabled: Ref<boolean>) {}

  static fromMessage(message: Message): LightState {
    return new LightState(ref(Boolean(message.data[0])));
  }

  public toMessage(): Message {
    return new Message(2, [Number(this.lightEnabled.value)]);
  }

  public updateFromMessage(message: Message) {
    if (message.id !== 1)
      throw new TypeError(`Message has an invalid id ${message.id}.`);
    this.lightEnabled.value = Boolean(message.data[0]);
  }
}
