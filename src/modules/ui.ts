import Toaster from "./Toaster/toaster";
import { setCSSVariable } from "./utils";

type Theme = "light" | "dark";

export default class UI {
  public readonly toaster = new Toaster();

  constructor() {
    this.updateTheme();

    matchMedia("(prefers-color-scheme: dark)").addEventListener(
      "change",
      this.updateTheme
    );
  }

  private updateTheme = () => {
    const matchesDark = matchMedia("(prefers-color-scheme: dark)").matches;
    const theme: Theme = matchesDark ? "dark" : "light";
    this.setTheme(theme);
  };

  private setTheme(theme: Theme): void {
    setCSSVariable("L-text", `var(--L-${theme}-text)`);
    setCSSVariable("L-surface", `var(--L-${theme}-surface)`);
    setCSSVariable("L-surface-top", `var(--L-${theme}-surface-top)`);
    setCSSVariable("L-surface-accent", `var(--L-${theme}-surface-accent)`);
    setCSSVariable("L-accent", `var(--L-${theme}-accent)`);
    setCSSVariable("L-cell-white", `var(--L-${theme}-cell-white)`);
    setCSSVariable("L-cell-black", `var(--L-${theme}-cell-black)`);
    setCSSVariable("L-piece-fill-white", `var(--L-${theme}-piece-fill-white)`);
    setCSSVariable("L-piece-fill-black", `var(--L-${theme}-piece-fill-black)`);
    setCSSVariable(
      "L-piece-stroke-white",
      `var(--L-${theme}-piece-stroke-white)`
    );
    setCSSVariable(
      "L-piece-stroke-black",
      `var(--L-${theme}-piece-stroke-black)`
    );
    setCSSVariable("L-dim", `var(--L-${theme}-dim)`);
  }
}
