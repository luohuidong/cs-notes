import { defineConfig } from "vitepress";
import sidebar from "./sidebar";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Notes",

  themeConfig: {
    search: {
      provider: "local",
    },

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: "DOM 与 Web components",
        link: "/dom-web-components/custom-element",
      },
    ],

    sidebar,

    socialLinks: [
      { icon: "github", link: "https://github.com/luohuidong/website-notes" },
    ],
  },
});
