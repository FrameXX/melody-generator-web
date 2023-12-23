import { Ref, ref } from "vue";
import Message from "./message";

export default class LightState {
  constructor(public lightEnabled: Ref<boolean>) {}

  static fromMessage(message: Message): LightState {
    if (message.id !== 1)
      throw new TypeError(`Message has an invalid id ${message.id}.`);
    return new LightState(ref(Boolean(message.data[1])));
  }
}
