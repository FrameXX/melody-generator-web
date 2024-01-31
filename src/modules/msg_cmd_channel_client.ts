import MsgCmd from "./msg_cmd";
import NtfyTopicClient from "./ntfy_topic_client";

export default class MsgCmdChannelClient extends EventTarget {
  constructor(private readonly ntfyTopicClient: NtfyTopicClient) {
    super();
    this.ntfyTopicClient.addEventListener("message", (event) => {
      this.handleReceivedMessage((event as CustomEvent).detail);
    });
  }

  private handleReceivedMessage(message: string) {
    const msgCmd = MsgCmd.fromString(message);
    const msgCmdEvent = new CustomEvent("msgcmd", { detail: msgCmd });
    this.dispatchEvent(msgCmdEvent);
  }

  public sendMsgCmd(msgCmd: MsgCmd) {
    const message = msgCmd.toString();
    this.ntfyTopicClient.sendMessage(message);
  }

  public async getAllMsgCmd() {
    const messages = await this.ntfyTopicClient.getAllMessages();
    const msgCmds: MsgCmd[] = [];
    for (const message of messages) {
      const msgCmd = MsgCmd.fromString(message);
      msgCmds.push(msgCmd);
    }
    return msgCmds;
  }
}
