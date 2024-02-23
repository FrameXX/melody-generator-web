export default class SoundWave {
  constructor(
    public startFrequency: number,
    public endFrequency: number,
    public startVolume: number,
    public endVolume: number,
    public durationMs: number
  ) {}

  public toString(roundToWholeNumbers = true) {
    return `${
      roundToWholeNumbers
        ? Math.round(this.startFrequency)
        : this.startFrequency
    } ${
      roundToWholeNumbers ? Math.round(this.endFrequency) : this.endFrequency
    } ${this.startVolume} ${this.endVolume} ${
      roundToWholeNumbers ? Math.round(this.durationMs) : this.durationMs
    }`;
  }
}
