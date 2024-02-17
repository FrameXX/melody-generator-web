export default class Oscillator {
  private readonly audioContext: AudioContext;
  private readonly oscillatorNode: OscillatorNode;

  constructor() {
    this.audioContext = new AudioContext();
    this.oscillatorNode = this.audioContext.createOscillator();
  }

  public play(frequency: number, type: OscillatorType) {
    this.oscillatorNode.type = type;
    this.oscillatorNode.frequency.value = frequency;

    const gainNode = this.audioContext.createGain();
    gainNode.gain.setValueAtTime(0.5, this.audioContext.currentTime);
    this.oscillatorNode
      .connect(gainNode)
      .connect(this.audioContext.destination);
    this.oscillatorNode.start(this.audioContext.currentTime);
  }

  public stopPlaying() {
    this.oscillatorNode.stop(this.audioContext.currentTime);
  }
}
