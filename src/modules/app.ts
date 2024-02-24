import { ref } from "vue";
import NtfyTopicMessenger from "./ntfy_topic_message_box";
import OscillatorRecorder from "./oscillator_recorder";
import Oscillator from "./oscillator";
import OscillatorFinishedPlayback from "./oscillator_finished_playback";
import Toaster from "./Toaster/toaster";
import OscillatorRecording from "./oscillator_recording";

export default class App {
  public readonly toaster = new Toaster();
  public readonly ntfyTopic = ref("melody-generator");
  private readonly speakerMessenger = new NtfyTopicMessenger(
    this.ntfyTopic.value
  );
  private readonly osciallatorRecorder = new OscillatorRecorder();

  private onOscillatorPlaybackFinish = (
    playback: OscillatorFinishedPlayback
  ) => {
    if (!this.recordingOscillator) return;

    const beforePlaybackRestDuration =
      Date.now() - this.lastOscillatorPlaybackFinishTime - playback.durationMs;
    if (beforePlaybackRestDuration)
      this.osciallatorRecorder.recordRest(beforePlaybackRestDuration);
    this.osciallatorRecorder.recordPlayback(playback);

    this.lastOscillatorPlaybackFinishTime = Date.now();
  };

  public oscillator = new Oscillator(this.onOscillatorPlaybackFinish);
  public readonly recordingOscillator = ref(false);
  private lastOscillatorPlaybackFinishTime = Date.now();
  public latestFinishedRecording = ref<null | OscillatorRecording>(null);

  public async playRecordedMelody() {
    if (!this.latestFinishedRecording.value) return;
    this.toaster.bake("Posílání melodie do bzučáku.", "send-outline");
    const melodyMessage = "0 " + this.latestFinishedRecording.value.toString();
    const sentSuccess = await this.speakerMessenger.sendMessage(melodyMessage);
    sentSuccess
      ? this.toaster.bake("Melodie úspěšně odeslána.", "send-check-outline")
      : this.toaster.bake("Odeslání melodie selhalo.", "send-fail-outline");
  }

  public toggleOscillatorRecording() {
    this.recordingOscillator.value
      ? this.stopOscillatorRecording()
      : this.startOscillatorRecording();
  }

  private startOscillatorRecording() {
    this.osciallatorRecorder.reset();
    if (this.oscillator.isPlaying) this.oscillator.stopPlaying();
    this.lastOscillatorPlaybackFinishTime = Date.now();
    this.recordingOscillator.value = true;
    this.toaster.bake("Nahrávání spuštěno.", "record");
  }

  private stopOscillatorRecording() {
    this.oscillator.isPlaying
      ? this.oscillator.stopPlaying()
      : this.osciallatorRecorder.recordRest(
          Date.now() - this.lastOscillatorPlaybackFinishTime
        );
    this.recordingOscillator.value = false;
    this.latestFinishedRecording.value = this.osciallatorRecorder.recording;
    this.toaster.bake("Nahrávání ukončeno.", "stop");
  }
}
