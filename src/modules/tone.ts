export default class Tone {
  constructor(
    public readonly name: string,
    public readonly frequency: number,
    public readonly accented = false
  ) {}
}
