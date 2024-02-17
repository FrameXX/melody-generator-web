import NoteFrequencyRules from "./note_frequency_rules";
import Notation from "./notation";

export default class Melody {
  constructor(public name: string, public notes: Notation[]) {}

  private isToneOnIndex(index: number) {
    return index < 0 || index >= this.notes.length;
  }

  public get noteCount() {
    return this.notes.length;
  }

  public toSpeakerCommand(
    noteFrequencyRules: NoteFrequencyRules,
    quarterDurationMs: number
  ) {
    const tones = this.notes.map((note) =>
      note.toTone(quarterDurationMs, noteFrequencyRules)
    );
    let command = tones[0].toString();
    for (let i = 1; i < tones.length; i++) {
      command += " " + tones[i].toString();
    }
    return command;
  }

  public toString() {
    let string = "";
    for (const note of this.notes) {
      string += ` ${note.toString()}`;
    }
    return string.substring(1, string.length - 1);
  }

  public removeTone(index: number) {
    if (!this.isToneOnIndex(index))
      throw new Error(`There's no note on index ${index}.`);
    this.notes.splice(index, 1);
  }

  public getTone(index: number) {
    if (!this.isToneOnIndex(index))
      throw new Error(`There's no note on index ${index}.`);
    return this.notes[index];
  }
}
