export default class Tone {
  constructor(
    private readonly startFrequency: number,
    private readonly endFrequency: number,
    private readonly duration: number,
    private readonly startVolume: number = 50,
    private readonly endVolume: number = 50
  ) {}

  public toString() {
    return `${this.startFrequency} ${this.endFrequency} ${this.startVolume} ${this.endVolume} ${this.duration}`;
  }
}
