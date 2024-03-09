export default class SoundWave {
  constructor(public frequency: number, public durationMs: number) {}

  public toString(roundToWholeNumbers = true) {
    return `${
      roundToWholeNumbers ? Math.round(this.frequency) : this.frequency
    } ${roundToWholeNumbers ? Math.round(this.durationMs) : this.durationMs} `;
  }
}
