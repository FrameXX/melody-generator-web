import Sound from "./sound";

export default class Melody {
  constructor(public name: string, public sounds: Sound[]) {}

  private isToneOnIndex(index: number) {
    return index < 0 || index >= this.sounds.length;
  }

  public get soundCount() {
    return this.sounds.length;
  }

  public toString() {
    let string = "";
    for (const sound of this.sounds) {
      string += ` ${sound.toString()}`;
    }
    return string.substring(1, string.length - 1);
  }

  public removeTone(index: number) {
    if (!this.isToneOnIndex(index))
      throw new Error(`There's no sound on index ${index}.`);
    this.sounds.splice(index, 1);
  }

  public getTone(index: number) {
    if (!this.isToneOnIndex(index))
      throw new Error(`There's no sound on index ${index}.`);
    return this.sounds[index];
  }
}
