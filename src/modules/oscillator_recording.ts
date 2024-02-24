import SoundWave from "./soundwave";

export default class OscillatorRecording {
  constructor(public soundwaves: SoundWave[]) {}

  private isToneOnIndex(index: number) {
    return index < 0 || index >= this.soundwaves.length;
  }

  public get soundwaveCount() {
    return this.soundwaves.length;
  }

  public multiplySpeed(multiplier: number) {
    const durationMultiplier = 1 / multiplier;
    for (const soundwave of this.soundwaves) {
      soundwave.durationMs *= durationMultiplier;
    }
  }

  public toString(roundToWholeNumbers = true) {
    let string = "";
    for (const soundwave of this.soundwaves) {
      string += ` ${soundwave.toString(roundToWholeNumbers)}`;
    }
    return string.substring(1, string.length - 1);
  }

  public removeSoundwave(index: number) {
    if (!this.isToneOnIndex(index))
      throw new Error(`There's no soundwave on index ${index}.`);
    this.soundwaves.splice(index, 1);
  }

  public pushSoundwave(soundwave: SoundWave) {
    this.soundwaves.push(soundwave);
  }

  public getSoundwave(index: number) {
    if (!this.isToneOnIndex(index))
      throw new Error(`There's no soundwave on index ${index}.`);
    return this.soundwaves[index];
  }
}
