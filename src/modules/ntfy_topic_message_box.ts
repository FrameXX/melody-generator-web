export default class NtfyTopicMessenger {
  constructor(public topic: string) {}

  private get postAddress() {
    return `https://ntfy.sh/${this.topic}`;
  }

  public async sendMessage(message: string) {
    let response;
    try {
      response = await fetch(this.postAddress, {
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
