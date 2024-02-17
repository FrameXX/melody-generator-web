import { RestValue } from "./rest_value";
import Tone from "./tone";
import Notation from "./notation";

export default class Rest extends Notation {
  constructor(private readonly value: RestValue) {
    super();
  }

  public getDurationMs(quarterDurationMs: number) {
    switch (this.value) {
      case "w":
        return quarterDurationMs / 4;
      case "h":
        return quarterDurationMs / 2;
      case "q":
        return quarterDurationMs;
      case "e":
        return 2 * quarterDurationMs;
      case "s":
        return 4 * quarterDurationMs;
      default:
        throw new Error(`rest has an invalid note value "${this.value}"`);
    }
  }

  public toTone(quarterDurationMs: number) {
    const durationMs = this.getDurationMs(quarterDurationMs);
    const tone = new Tone(0, 0, 0, 0, durationMs);
    return tone;
  }

  public toString() {
    return `0 ${this.value}`;
  }
}
