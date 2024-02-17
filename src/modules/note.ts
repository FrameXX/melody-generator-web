import NoteFrequencyRules from "./note_frequency_rules";
import { NotePitch, note_pitches } from "./note_pitch";
import { NoteValue } from "./note_value";
import Tone from "./tone";
import Notation from "./notation";

export default class Note extends Notation {
  constructor(
    private readonly accidental: boolean,
    private readonly note: NotePitch,
    private readonly octave: number,
    private readonly value: NoteValue
  ) {
    super();
  }

  public get index() {
    const indexAccidental = this.accidental ? 1 : 0;
    const index =
      note_pitches.indexOf(this.note) * 2 + this.octave * 14 + indexAccidental;
    return index;
  }

  public getFrequency(noteFrequencyRules: NoteFrequencyRules) {
    const noteIndex = this.index + noteFrequencyRules.noteIndexShift;
    const frequency =
      2 ** (noteIndex / 14) * noteFrequencyRules.firstCFrequency;
    return frequency;
  }

  public getDurationMs(quarterDurationMs: number) {
    switch (this.value) {
      case "w":
        return quarterDurationMs / 4;
      case "w.":
        return (3 * quarterDurationMs) / 8;
      case "h":
        return quarterDurationMs / 2;
      case "h.":
        return (3 * quarterDurationMs) / 4;
      case "q":
        return quarterDurationMs;
      case "q.":
        return (3 * quarterDurationMs) / 2;
      case "e":
        return 2 * quarterDurationMs;
      case "e.":
        return 3 * quarterDurationMs;
      case "s":
        return 4 * quarterDurationMs;
      case "s.":
        return 6 * quarterDurationMs;
      default:
        throw new Error(`Note has an invalid note value "${this.value}"`);
    }
  }

  public toTone(
    quarterDurationMs: number,
    noteFrequencyRules: NoteFrequencyRules
  ) {
    const frequency = this.getFrequency(noteFrequencyRules);
    const durationMs = this.getDurationMs(quarterDurationMs);
    const tone = new Tone(frequency, frequency, 50, 50, durationMs);
    return tone;
  }
}
