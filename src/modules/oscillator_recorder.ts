import OscillatorRecording from "./oscillator_recording";
import OscillatorFinishedPlayback from "./oscillator_finished_playback";
import SoundWave from "./soundwave";

export default class OscillatorRecorder {
  public recording: OscillatorRecording = new OscillatorRecording([]);

  public recordPlayback(playback: OscillatorFinishedPlayback) {
    const soundwave = new SoundWave(
      playback.frequency,
      playback.durationMs + playback.finishGainNodeLinearRampDelay * 1000
    );
    this.recording.pushSoundwave(soundwave);
  }

  public recordRest(durationMs: number) {
    const soundwawe = new SoundWave(0, durationMs);
    this.recording.pushSoundwave(soundwawe);
  }

  public reset() {
    this.recording = new OscillatorRecording([]);
  }
}
