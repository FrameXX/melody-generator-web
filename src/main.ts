import { createApp } from "vue";
import App from "./App.vue";

// Vuetify
import "vuetify/styles";
import { ThemeDefinition, createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const light: ThemeDefinition = {
  dark: false,
  colors: {
    background: "#F5F5F5",
    surface: "#FFFFFF",
    primary: "#FFC107",
    secondary: "#8BC34A",
    error: "#B00020",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
  },
};

const dark: ThemeDefinition = {
  dark: true,
  colors: {
    background: "#000000",
    surface: "##212121",
    primary: "#FFC107",
    secondary: "#8BC34A",
    error: "#B00020",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
  },
};

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "dark",
    themes: {
      light,
      dark,
    },
  },
});

createApp(App).use(vuetify).mount("#app");
