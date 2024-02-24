export default class SoundWave {
  constructor(
    public startFrequency: number,
    public endFrequency: number,
    public durationMs: number
  ) {}

  public toString(roundToWholeNumbers = true) {
    return `${
      roundToWholeNumbers
        ? Math.round(this.startFrequency)
        : this.startFrequency
    } ${
      roundToWholeNumbers ? Math.round(this.endFrequency) : this.endFrequency
    } ${roundToWholeNumbers ? Math.round(this.durationMs) : this.durationMs}`;
  }
}
