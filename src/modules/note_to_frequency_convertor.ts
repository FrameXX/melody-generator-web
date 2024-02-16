import Note from "./note";
import Tone from "./note";

export default class NoteToFrequencyConvertor {
  constructor(
    private readonly noteShift: number,
    private readonly firstCFrequency = 16.3516
  ) {}

  public getFrequency(note: Note) {}
}
