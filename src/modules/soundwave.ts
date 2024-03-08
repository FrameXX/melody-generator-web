export default class SoundWave {
  constructor(public frequency: number, public durationMs: number) {}

  public toString(roundToWholeNumbers = true) {
    console.log(
      this,
      `${roundToWholeNumbers ? Math.round(this.frequency) : this.frequency} ${
        roundToWholeNumbers ? Math.round(this.durationMs) : this.durationMs
      }`
    );
    return `${
      roundToWholeNumbers ? Math.round(this.frequency) : this.frequency
    } ${roundToWholeNumbers ? Math.round(this.durationMs) : this.durationMs} `;
  }
}
