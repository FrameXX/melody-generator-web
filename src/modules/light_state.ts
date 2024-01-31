import App from "./app";
import MsgCmd from "./msg_cmd";
import MsgCmdChannelClient from "./msg_cmd_channel_client";

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

  public updateFromMsgCmd(message: MsgCmd) {
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

  private updateFromLight(channel: MsgCmdChannelClient): Promise<boolean> {
    this.app.ui.toaster.bake("Vyčkávání na aktualiaci od světla.", "wifi");

    const msgCmd = new MsgCmd(0);
    channel.sendMsgCmd(msgCmd);
    return new Promise((resolve) => {
      channel.addEventListener("msgcmd", (event) => {
        const msgCmd = (event as CustomEvent).detail as MsgCmd;
        if (msgCmd.cmdId !== 1) return;
        this.updateFromMsgCmd(msgCmd);
        resolve(true);
      });

      window.setTimeout(() => {
        this.app.ui.toaster.bake(
          "Čas na odpověď světla vypršel.",
          "wifi-remove",
          "error"
        );
        resolve(false);
      }, 9000);
    });
  }

  public async updateFromMsgCmdChannel(
    channel: MsgCmdChannelClient
  ): Promise<boolean> {
    let allMsgCmds: MsgCmd[];

    try {
      allMsgCmds = await channel.getAllMsgCmd();
    } catch (error) {
      console.error(error);
      this.app.ui.toaster.bake(
        "Připojení k serveru se nezdařilo.",
        "wifi-remove",
        "error"
      );
      return false;
    }

    for (const msgCmd of allMsgCmds) {
      if (msgCmd.cmdId !== 1 && msgCmd.cmdId !== 2) continue;
      this.updateFromMsgCmd(msgCmd);
      return true;
    }
    this.app.ui.toaster.bake(
      "Aktualizace z cache zpráv se nezdařila.",
      "wifi-remove",
      "error"
    );

    const updated = await this.updateFromLight(channel);

    return updated;
  }

  public toMessage(): MsgCmd {
    return new MsgCmd(2, [+this.enabled]);
  }
}
