import { Ref } from "vue";
import { getRandomId } from "./utils";

export type ToastType = "info" | "error" | "success";

export default class Toast {
  public readonly id = getRandomId();
  private readonly timeout: number;

  constructor(
    private readonly toasts: Ref<Toast[]>,
    public readonly message: string,
    public readonly type: ToastType,
    durationMs: number,
    public readonly iconId?: string
  ) {
    this.toasts.value.push(this);

    this.timeout = setTimeout(() => {
      this.hide();
    }, durationMs);
  }

  public hide = () => {
    this.toasts.value = this.toasts.value.filter(
      (toast) => toast.id !== this.id
    );
    clearTimeout(this.timeout);
  };
}
