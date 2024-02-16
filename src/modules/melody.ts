import Tone from "./note";

export default class Melody {
  constructor(public name: string, private tones: Tone[]) {}

  private isToneOnIndex(index: number) {
    return index < 0 || index >= this.tones.length;
  }

  public get toneCount() {
    return this.tones.length;
  }

  public toString() {
    let string = "";
    for (const tone of this.tones) {
      string += ` ${tone.toString()}`;
    }
    return string.substring(1, string.length - 1);
  }

  public removeTone(index: number) {
    if (!this.isToneOnIndex(index))
      throw new Error(`There's no tone on index ${index}.`);
    this.tones.splice(index, 1);
  }

  public getTone(index: number) {
    if (!this.isToneOnIndex(index))
      throw new Error(`There's no tone on index ${index}.`);
    return this.tones[index];
  }
}
