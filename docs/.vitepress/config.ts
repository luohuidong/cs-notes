import nav from './nav'
import sidebar from './sidebar.js'

// Mermaid 支持
import { withMermaid } from 'vitepress-plugin-mermaid'

// https://vitepress.dev/reference/site-config
export default withMermaid({
  title: 'Notes',

  markdown: {
    math: true,
  },

  // Mermaid 配置
  mermaid: {
    theme: 'default',
    darkMode: true,
    themeVariables: {
      darkMode: true,
    },
  },
  mermaidPlugin: {
    class: 'mermaid',
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
