import { useTheme } from "vuetify";
import Toast, { ToastType } from "./toast";
import { Ref, ref } from "vue";

export default class UI {
  private readonly theme = useTheme();
  private readonly initialToastDurationMs = 1200;
  private readonly toastDurationMsPerChar = 70;
  public readonly toasts: Ref<Toast[]> = ref([]);
  private readonly maxToastsCount = 3;

  constructor() {
    this.updateTheme();
    matchMedia("(prefers-color-scheme: dark)").addEventListener(
      "change",
      this.updateTheme
    );
  }

  public createToast(
    message: string,
    iconId?: string,
    type: ToastType = "info",
    durationMs?: number
  ) {
    if (this.toasts.value.length > this.maxToastsCount)
      this.toasts.value[this.toasts.value.length - 1].hide();

    if (!durationMs)
      durationMs =
        this.initialToastDurationMs +
        this.toastDurationMsPerChar * message.length;

    new Toast(this.toasts, message, type, durationMs, iconId);
  }

  private updateTheme = () => {
    const dark = matchMedia("(prefers-color-scheme: dark)").matches;
    this.theme.global.name.value = dark ? "dark" : "light";
  };
}
