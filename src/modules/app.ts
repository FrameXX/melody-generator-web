import { ref } from "vue";
import UI from "./ui";
import NtfyTopicMessenger from "./ntfy_topic_message_box";
import NoteFrequencyRules from "./note_frequency_rules";
import { default_melody } from "./default_melodies";

export default class App {
  public readonly ui = new UI();
  public readonly ntfyTopic = ref("melody-generator");
  private speakerMessenger = new NtfyTopicMessenger(this.ntfyTopic.value);
  private readonly noteFrequencyRules = new NoteFrequencyRules(21);
  public melodies = [default_melody];
  public activeMelody = this.melodies[0];

  constructor() {
    if (!navigator.cookieEnabled) return;
  }

  private restoreMelodies() {}
}
