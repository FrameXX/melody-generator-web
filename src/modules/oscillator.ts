import OscillatorFinishedPlayback from "./oscillator_finished_playback";

export type OscillatorPlaybackFisnishCallback = (
  playback: OscillatorFinishedPlayback
) => any;

export default class Oscillator {
  private readonly audioContext: AudioContext;
  private readonly oscillatorNode: OscillatorNode;
  private readonly gainNode: GainNode;
  public isPlaying: boolean = false;
  private playingFrequency = 0;
  private startGainNodeLinearRampDelay = 0;
  public playBackStartTime = 0;

  constructor(
    private readonly playbackFisnishCallback?: OscillatorPlaybackFisnishCallback
  ) {
    this.audioContext = new AudioContext();
    this.oscillatorNode = this.audioContext.createOscillator();
    this.gainNode = this.audioContext.createGain();

    this.oscillatorNode.connect(this.gainNode);
    this.gainNode.connect(this.audioContext.destination);
    this.gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    this.oscillatorNode.start(0);
  }

  public get playbackDurationMs() {
    return Date.now() - this.playBackStartTime;
  }

  public play(
    frequency: number,
    gainNodeLinearRampDelay = 0.1,
    oscillatorType: OscillatorType = "square"
  ) {
    if (this.audioContext.state != "running") this.audioContext.resume();

    this.playingFrequency = frequency;
    this.startGainNodeLinearRampDelay = gainNodeLinearRampDelay;

    this.oscillatorNode.type = oscillatorType;
    this.oscillatorNode.frequency.value = frequency;
    this.gainNode.gain.cancelScheduledValues(this.audioContext.currentTime);
    this.gainNode.gain.linearRampToValueAtTime(
      1,
      this.audioContext.currentTime + gainNodeLinearRampDelay
    );
    this.playBackStartTime = Date.now();
    this.isPlaying = true;
  }

  public stopPlaying(gainNodeLinearRampDelay = 0.1) {
    gainNodeLinearRampDelay = Math.max(gainNodeLinearRampDelay, 0.1);
    this.gainNode.gain.linearRampToValueAtTime(
      0,
      this.audioContext.currentTime + gainNodeLinearRampDelay
    );
    this.isPlaying = false;

    if (!this.playbackFisnishCallback) return;
    const playback = new OscillatorFinishedPlayback(
      this.playingFrequency,
      this.playbackDurationMs,
      this.startGainNodeLinearRampDelay,
      gainNodeLinearRampDelay
    );
    this.playbackFisnishCallback(playback);
  }
}
