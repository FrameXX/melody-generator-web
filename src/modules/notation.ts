import NoteFrequencyRules from "./note_frequency_rules";
import Tone from "./tone";

export default abstract class Notation {
  public abstract toTone(
    quarterDurationMs: number,
    noteFrequencyRules: NoteFrequencyRules
  ): Tone;
}
