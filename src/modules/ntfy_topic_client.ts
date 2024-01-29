export default class NtfyTopicClient {
  private eventSource: EventSource;

  constructor(
    private topic: string,
    private receivedMessageHandler: (message: string) => any
  ) {
    this.eventSource = new EventSource(this.eventSourceUrl);
    this.eventSource.addEventListener(
      "message",
      this.handleReceivedEvent.bind(this)
    );
  }

  private handleReceivedEvent(event: MessageEvent) {
    const message = JSON.parse(event.data).message;
    this.receivedMessageHandler(message);
  }

  private get eventSourceUrl() {
    return `https://ntfy.sh/${this.topic}/sse`;
  }

  private get pollUrl() {
    return `https://ntfy.sh/${this.topic}/json?poll=1`;
  }

  private get postUrl() {
    return `https://ntfy.sh/${this.topic}`;
  }

  public async getAllMessages(): Promise<string[]> {
    let response;
    response = await fetch(this.pollUrl, { method: "GET" });

    if (!response.ok) throw new Error("Ntfy topic poll response not OK");

    const text = await response.text();
    if (!text) return [];

    const messagesJSON = text.split("\n");
    messagesJSON.pop();

    const messages: string[] = [];
    for (const messageJSON of messagesJSON) {
      messages.push(JSON.parse(messageJSON).message);
    }

    return messages;
  }

  public async sendMessage(message: string) {
    let response;
    try {
      response = await fetch(this.postUrl, {
        method: "POST",
        body: message,
      });
    } catch (error) {
      console.error(error);
      return false;
    }
    return response.ok;
  }
}
