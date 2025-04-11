import { defineConfig } from 'vitepress'

import nav from './nav'
import sidebar from './sidebar.js'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Notes',

  markdown: {
    math: true,
  },

  themeConfig: {
    search: {
      provider: 'local',
    },

    // https://vitepress.dev/reference/default-theme-config
    nav,

    sidebar,

    socialLinks: [{ icon: 'github', link: 'https://github.com/luohuidong/website-notes' }],

    outline: [2, 3],
  },
})
