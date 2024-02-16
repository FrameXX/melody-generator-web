import { Note } from "./note";
import { NoteAccidental } from "./note_accidental";
import { NoteValue } from "./note_value";

export default class Tone {
  constructor(
    private readonly accidental: NoteAccidental,
    private readonly note: Note,
    private readonly octave: number,
    private readonly value: NoteValue
  ) {}

  public toString() {}
}
