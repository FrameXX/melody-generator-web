import NtfyTopicClient from "./ntfy_topic_client";

export default class MsgCmdChannelClient {
  constructor(private readonly ntfyTopicClient: NtfyTopicClient) {}
}
