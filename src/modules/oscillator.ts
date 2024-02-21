import OscillatorRecorder from "./oscillator_recorder";

export default class Oscillator {
  private readonly audioContext: AudioContext;
  private readonly oscillatorNode: OscillatorNode;
  private readonly gainNode: GainNode;
  public isPlaying: boolean = false;
  public playBackStartTime = 0;

  // @ts-ignore
  constructor(private readonly recorder?: OscillatorRecorder) {
    this.audioContext = new AudioContext();
    this.oscillatorNode = this.audioContext.createOscillator();
    this.gainNode = this.audioContext.createGain();

    this.oscillatorNode.connect(this.gainNode);
    this.gainNode.connect(this.audioContext.destination);
    this.gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    this.oscillatorNode.start(0);
  }

  public get playbackDuration() {
    return Date.now() - this.playBackStartTime;
  }

  public setFrequency(frequency: number) {
    this.oscillatorNode.frequency.value = frequency;
  }

  public play(
    frequency: number,
    type: OscillatorType = "square",
    gainNodeLinearRampDelay = 0.1
  ) {
    if (this.audioContext.state != "running") this.audioContext.resume();
    this.oscillatorNode.type = type;
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
  }
}
