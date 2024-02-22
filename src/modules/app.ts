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
  // @ts-ignore
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
    this.toaster.bake("Started recording", "record");
  }

  private stopOscillatorRecording() {
    this.oscillator.isPlaying
      ? this.oscillator.stopPlaying()
      : this.osciallatorRecorder.recordRest(
          Date.now() - this.lastOscillatorPlaybackFinishTime
        );
    this.recordingOscillator.value = false;
    this.recordedMelody.value = this.osciallatorRecorder.recording;
    this.toaster.bake("Stopped recording", "stop");
  }
}
