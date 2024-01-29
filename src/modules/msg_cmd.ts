export default class MsgCmd {
  constructor(
    public readonly cmdId: number,
    public readonly args: number[] = []
  ) {}

  static fromString(string: string): MsgCmd {
    const strNumbers = string.split(" ");
    const numbers = strNumbers.map((strNumber) => +strNumber);

    if (numbers.length < 1) {
      const message = new MsgCmd(0, []);
      return message;
    }

    let id = numbers.shift();
    if (Number.isNaN(id) || typeof id === "undefined") id = 0;

    const message = new MsgCmd(id, numbers);
    return message;
  }

  public toString(): string {
    let string = `${this.cmdId}`;
    for (const number of this.args) {
      string = `${string} ${number}`;
    }
    return string;
  }
}
