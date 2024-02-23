import { ref } from "vue";
import NtfyTopicMessenger from "./ntfy_topic_message_box";
import OscillatorRecorder from "./oscillator_recorder";
import Oscillator from "./oscillator";
import OscillatorFinishedPlayback from "./oscillator_finished_playback";
import Toaster from "./Toaster/toaster";
import Melody from "./melody";

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
    this.osciallatorRecorder.recordRest(
      Date.now() - playback.durationMs - this.lastOscillatorPlaybackFinishTime
    );
    this.osciallatorRecorder.recordPlayback(playback);
    this.lastOscillatorPlaybackFinishTime = Date.now();
  };

  public oscillator = new Oscillator(this.onOscillatorPlaybackFinish);
  public readonly recordingOscillator = ref(false);
  private lastOscillatorPlaybackFinishTime = Date.now();
  public recordedMelody = ref<null | Melody>(null);

  public async playRecordedMelody() {
    if (!this.recordedMelody.value) return;
    this.toaster.bake("Posílání melodie do bzučáku.", "send-outline");
    const melodyMessage = "0 " + this.recordedMelody.value.toString();
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
    this.recordedMelody.value = this.osciallatorRecorder.recording;
    this.recordedMelody.value.multiplySpeed(1.5);
    this.toaster.bake("Nahrávání ukončeno.", "stop");
  }
}
