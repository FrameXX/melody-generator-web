import SoundWave from "./soundwave";

export default class Melody {
  constructor(public name: string, public soundwaves: SoundWave[]) {}

  private isToneOnIndex(index: number) {
    return index < 0 || index >= this.soundwaves.length;
  }

  public get soundwaveCount() {
    return this.soundwaves.length;
  }

  public toString() {
    let string = "";
    for (const soundwave of this.soundwaves) {
      string += ` ${soundwave.toString()}`;
    }
    return string.substring(1, string.length - 1);
  }

  public removeTone(index: number) {
    if (!this.isToneOnIndex(index))
      throw new Error(`There's no soundwave on index ${index}.`);
    this.soundwaves.splice(index, 1);
  }

  public getTone(index: number) {
    if (!this.isToneOnIndex(index))
      throw new Error(`There's no soundwave on index ${index}.`);
    return this.soundwaves[index];
  }
}
