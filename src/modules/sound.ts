export default class Sound {
  constructor(
    private readonly startFrequency: number,
    private readonly endFrequency: number,
    private readonly startVolume: number,
    private readonly endVolume: number,
    private readonly durationMs: number
  ) {}

  public toString() {
    return `${this.startFrequency} ${this.endFrequency} ${this.startVolume} ${this.endVolume} ${this.durationMs}`;
  }
}
