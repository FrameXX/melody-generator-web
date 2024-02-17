import { NoteAccidental } from "./note_accidental";
import NoteFrequencyRules from "./note_frequency_rules";
import { NotePitch, note_pitches } from "./note_pitch";
import { NoteValue } from "./note_value";
import Tone from "./tone";

export default class Note {
  constructor(
    private readonly accidental: NoteAccidental,
    private readonly note: NotePitch,
    private readonly octave: number,
    private readonly value: NoteValue
  ) {}

  public get index() {
    return note_pitches.indexOf(this.note) + this.octave * 7;
  }

  public getFrequency(noteFrequencyRules: NoteFrequencyRules) {
    const noteIndex = this.index + noteFrequencyRules.noteIndexShift;
    const frequency = 2 ** (noteIndex / 7) * noteFrequencyRules.firstCFrequency;
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

  public toSpeakerCommand() {}

  public toTone(
    noteFrequencyRules: NoteFrequencyRules,
    quarterDurationMs: number
  ) {
    const frequency = this.getFrequency(noteFrequencyRules);
    const durationMs = this.getDurationMs(quarterDurationMs);
    const tone = new Tone(frequency, frequency, 50, 50, durationMs);
    return tone;
  }

  public toString() {
    return (
      `${this.accidental} ${this.note} ${this.octave}, ${this.value}` + "\n"
    );
  }
}
