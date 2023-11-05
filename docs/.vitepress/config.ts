import { defineConfig, type DefaultTheme } from "vitepress";
import fs from "node:fs";
import yaml from "js-yaml";

import sidebar from "./sidebar";

const navurl = new URL("./nav.yml", import.meta.url).pathname;
const nav = yaml.load(
  fs.readFileSync(navurl, "utf8")
) as DefaultTheme.NavItem[];

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

    socialLinks: [
      { icon: "github", link: "https://github.com/luohuidong/website-notes" },
    ],
  },
});
