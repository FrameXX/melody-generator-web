export default class LightState {
  constructor(public lightEnabled: boolean) {}

  static fromValues(values: number[]): LightState {
    if (values.length !== 2)
      throw new TypeError("Provided message has invalid count of values.");
    if (values[0] !== 1)
      throw new TypeError("Provided message has wrong identificator number.");

    return new LightState(Boolean(values[1]));
  }
}
