import type { DefaultTheme } from 'vitepress'

const nav: DefaultTheme.NavItem[] = [
  {
    text: 'Frontend',
    items: [
      { text: 'JavaScript 对象', link: '/frontend/object/base/object-property' },
      { text: 'Web Components', link: '/frontend/web-components/custom-element/create' },
    ],
  },
  {
    text: 'CS',
    items: [
      { text: '数据结构', link: 'cs/data-structure/liner-list/stack' },
      { text: '算法', link: '/cs/algorithm/sort/bubble-sort' },
      { text: 'leetcode', link: '/cs/leetcode/' },
    ],
  },
  {
    text: 'Linux',
    items: [
      { text: 'Linux', link: '/linux/linux/command-line-proxy' },
      { text: 'Shell Script', link: '/linux/shell-script/what-is-shell-script' },
      { text: 'Neovim', link: '/linux/neovim/install' },
    ],
  },
]

export default nav
