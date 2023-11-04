import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Notes",

  themeConfig: {
    search: {
      provider: "local",
    },

    // https://vitepress.dev/reference/default-theme-config
    nav: [],

    sidebar: [
      {
        text: "Web Components",
        items: [
          { text: "Custom element", link: "/web-components/custom-element" },
          { text: "Shadow DOM", link: "/web-components/shadow-dom" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/luohuidong/website-notes" },
    ],
  },
});
