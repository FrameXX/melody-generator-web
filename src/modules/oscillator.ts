export default class Oscillator {
  private readonly audioContext: AudioContext;
  private readonly oscillatorNode: OscillatorNode;
  private readonly gainNode: GainNode;
  private isPlaying: boolean = false;

  constructor() {
    this.audioContext = new AudioContext();
    this.oscillatorNode = this.audioContext.createOscillator();
    this.gainNode = this.audioContext.createGain();

    this.oscillatorNode.connect(this.gainNode);
    this.gainNode.connect(this.audioContext.destination);
    this.gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    this.oscillatorNode.start(0);
  }

  public play(frequency: number, type: OscillatorType = "sine") {
    if (this.audioContext.state != "running") this.audioContext.resume();
    this.oscillatorNode.type = type;
    this.oscillatorNode.frequency.value = frequency;
    this.gainNode.gain.setValueAtTime(1, this.audioContext.currentTime);
    this.isPlaying = true;
  }

  public stopPlaying() {
    this.gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    this.isPlaying = false;
  }
}
