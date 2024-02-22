import Melody from "./melody";
import OscillatorFinishedPlayback from "./oscillator_finished_playback";
import SoundWave from "./soundwave";

export default class OscillatorRecorder {
  public recording: Melody = new Melody([]);

  public recordPlayback(playback: OscillatorFinishedPlayback) {
    const startingSoundwave = new SoundWave(
      playback.frequency,
      playback.frequency,
      0,
      100,
      playback.startGainNodeLinearRampDelay
    );
    this.recording.pushSoundwave(startingSoundwave);

    const soundwave = new SoundWave(
      playback.frequency,
      playback.frequency,
      100,
      100,
      playback.durationMs
    );
    this.recording.pushSoundwave(soundwave);

    const finishingSoundwawe = new SoundWave(
      playback.frequency,
      playback.frequency,
      100,
      0,
      playback.finishGainNodeLinearRampDelay
    );
    this.recording.pushSoundwave(finishingSoundwawe);
  }

  public recordRest(durationMs: number) {
    const soundwawe = new SoundWave(0, 0, 0, 0, durationMs);
    this.recording.pushSoundwave(soundwawe);
  }

  public reset() {
    this.recording = new Melody([]);
  }
}
