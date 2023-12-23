import App from "./app";
import { useTheme } from "vuetify";

export default class UI {
  private readonly theme = useTheme();

  constructor(private readonly app: App) {
    this.updateTheme();
    matchMedia("(prefers-color-scheme: dark)").addEventListener(
      "change",
      this.updateTheme
    );
  }

  private updateTheme = () => {
    const dark = matchMedia("(prefers-color-scheme: dark)").matches;
    this.theme.global.name.value = dark ? "dark" : "light";
  };
}
