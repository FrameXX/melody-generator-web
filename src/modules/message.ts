export default class Message {
  constructor(
    public readonly id: number,
    public readonly data: number[] = []
  ) {}

  static fromString(string: string): Message {
    const pattern = /\d+(?:\s+\d+)*$/;
    const matches = pattern.test(string);
    if (!matches)
      throw new TypeError(
        `The string "${string}" cannot be converted into a message. It doesn't match the required pattern.`
      );

    const strNumbers = string.split(/\s/);
    const numbers = strNumbers.map((strNumber) => +strNumber);
    if (numbers.length < 1)
      throw new TypeError(
        "Failed to parse the string into an array longer than 0."
      );

    const id = numbers.shift();
    if (typeof id !== "number")
      throw new TypeError("Failed to extract message id from string.");

    const message = new Message(id, numbers);
    return message;
  }

  public toString(): string {
    let string = `${this.id}`;
    for (const number of this.data) {
      string = `${string} ${number}`;
    }
    return string;
  }
}
