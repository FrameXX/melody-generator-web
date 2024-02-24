import Melody from "./melody";
import OscillatorFinishedPlayback from "./oscillator_finished_playback";
import SoundWave from "./soundwave";

export default class OscillatorRecorder {
  public recording: Melody = new Melody([]);

  public recordPlayback(playback: OscillatorFinishedPlayback) {
    const soundwave = new SoundWave(
      playback.frequency,
      playback.frequency,
      playback.durationMs
    );
    this.recording.pushSoundwave(soundwave);
  }

  public recordRest(durationMs: number) {
    const soundwawe = new SoundWave(0, 0, durationMs);
    this.recording.pushSoundwave(soundwawe);
  }

  public reset() {
    this.recording = new Melody([]);
  }
}
