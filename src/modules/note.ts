import { NoteAccidental } from "./note_accidental";
import { NotePitch } from "./note_pitch";
import { NoteValue } from "./note_value";

export default class Note {
  constructor(
    private readonly accidental: NoteAccidental,
    private readonly note: NotePitch,
    private readonly octave: number,
    private readonly value: NoteValue
  ) {}

  public toSpeakerCommand() {}

  public exportString() {
    return (
      `${this.accidental} ${this.note} ${this.octave}, ${this.value}` + "\n"
    );
  }
}
