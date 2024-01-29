import App from "./app";
import MsgCmd from "./msg_cmd";
import NtfyTopicClient from "./ntfy_topic_client";

export default class LightState {
  constructor(
    private readonly app: App,
    public enabled: boolean = true,
    public RDutyCycle: number = 255,
    public GDutyCycle: number = 255,
    public BDutyCycle: number = 255,
    public hueAnimationEnabled: boolean = true,
    public hueAnimationIntervalMs: number = 3000
  ) {}

  public updateFromMessage(message: MsgCmd) {
    if (message.args.length !== 6)
      throw new Error(
        `Light state message has an invalid argument count of ${message.args.length}`
      );

    this.enabled = Boolean(message.args[0]);
    this.RDutyCycle = message.args[1];
    this.GDutyCycle = message.args[2];
    this.BDutyCycle = message.args[3];
    this.hueAnimationEnabled = Boolean(message.args[4]);
    this.hueAnimationIntervalMs = message.args[5];
  }

  private requestUpdate(ntfyTopicClient: NtfyTopicClient) {
    ntfyTopicClient.sendMessage("0");
  }

  public async updateFromNtfyTopicClient(
    ntfyTopicClient: NtfyTopicClient
  ): Promise<boolean> {
    let allMessages: string[];

    try {
      allMessages = await ntfyTopicClient.getAllMessages();
    } catch (error) {
      console.error(error);
      this.app.ui.toaster.bake(
        "Připojení k serveru se nezdařilo.",
        "wifi-remove"
      );
      return false;
    }

    console.log(allMessages);

    for (const message of allMessages) {
      const messageCmd = MsgCmd.fromString(message);
      if (messageCmd.cmdId !== 1 && messageCmd.cmdId !== 2) continue;
      this.updateFromMessage(messageCmd);
      return true;
    }

    this.requestUpdate(ntfyTopicClient);

    return false;
  }

  public toMessage(): MsgCmd {
    return new MsgCmd(2, [+this.enabled]);
  }
}
