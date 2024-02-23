import Melody from "./melody";
import OscillatorFinishedPlayback from "./oscillator_finished_playback";
import SoundWave from "./soundwave";

const recordingSoundwaveVolume = 30;

export default class OscillatorRecorder {
  public recording: Melody = new Melody([]);

  public recordPlayback(playback: OscillatorFinishedPlayback) {
    const startingSoundwave = new SoundWave(
      playback.frequency,
      playback.frequency,
      0,
      recordingSoundwaveVolume,
      playback.startGainNodeLinearRampDelay * 1000
    );
    this.recording.pushSoundwave(startingSoundwave);

    const soundwave = new SoundWave(
      playback.frequency,
      playback.frequency,
      recordingSoundwaveVolume,
      recordingSoundwaveVolume,
      playback.durationMs
    );
    this.recording.pushSoundwave(soundwave);

    const finishingSoundwawe = new SoundWave(
      playback.frequency,
      playback.frequency,
      recordingSoundwaveVolume,
      0,
      playback.finishGainNodeLinearRampDelay * 1000
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
