import { defineConfig } from "vitepress";

import nav from "./nav";
import sidebar from "./sidebar";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Notes",

  themeConfig: {
    search: {
      provider: "local",
    },

    // https://vitepress.dev/reference/default-theme-config
    nav,

    sidebar,

    socialLinks: [{ icon: "github", link: "https://github.com/luohuidong/website-notes" }],
  },
});
