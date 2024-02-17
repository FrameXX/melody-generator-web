import NoteFrequencyRules from "./note_frequency_rules";
import Tone from "./tone";

export default abstract class ToneDerivative {
  public abstract toTone(
    quarterDurationMs: number,
    noteFrequencyRules: NoteFrequencyRules
  ): Tone;
}
