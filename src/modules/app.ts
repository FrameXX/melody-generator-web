import { ref, watch } from "vue";
import UI from "./ui";
import NtfyTopicMessenger from "./ntfy_topic_message_box";

export default class App {
  public readonly ui = new UI();
  public readonly ntfyTopic = ref("melody-generator");
  private speakerMessenger = new NtfyTopicMessenger(this.ntfyTopic.value);

  constructor() {
    if (!navigator.cookieEnabled) return;

    const ntfyTopicData = localStorage.getItem("ntfyTopic");
    if (ntfyTopicData) this.ntfyTopic.value = ntfyTopicData;

    watch(this.ntfyTopic, (newValue) => {
      localStorage.setItem("ntfyTopic", newValue);
    });
  }
}
