export default class OscillatorFinishedPlayback {
  constructor(
    public frequency: number,
    public durationMs: number,
    public startGainNodeLinearRampDelay: number,
    public finishGainNodeLinearRampDelay: number
  ) {}
}
