import { reactive, ref } from "vue";
import UI from "./ui";
import NtfyTopicMessenger from "./ntfy_topic_message_box";
import NoteFrequencyRules from "./note_frequency_rules";
import { default_melody } from "./default_melodies";
import Melody from "./melody";

export default class App {
  public readonly ui = new UI();
  public readonly ntfyTopic = ref("melody-generator");
  private speakerMessenger = new NtfyTopicMessenger(this.ntfyTopic.value);
  private readonly noteFrequencyRules = new NoteFrequencyRules(21);
  public melodies = reactive([default_melody]);
  public activeMelody = reactive(this.melodies[0]) as Melody;

  constructor() {}
}
