import type { DefaultTheme } from 'vitepress'

const nav: DefaultTheme.NavItem[] = [
  {
    text: 'CS',
    items: [
      { text: '数据结构', link: 'cs/data-structure/liner-list/stack' },
      { text: '算法', link: '/cs/algorithm/sort/bubble-sort' },
      { text: 'leetcode', link: '/cs/leetcode/' },
      { text: '设计模式', link: '/cs/design-pattern/' },
      { text: '计算机组成原理', link: '/cs/computer-organization-and-architecture/' },
    ],
  },
  {
    text: 'Frontend',
    items: [
      { text: 'Babel', link: '/frontend/babel/' },
      { text: 'JavaScript 对象', link: '/frontend/object/base/object-property' },
      { text: 'Web Components', link: '/frontend/web-components/custom-element/create' },
    ],
  },
  {
    text: 'Backend',
    items: [{ text: 'MySQL', link: '/backend/mysql/' }],
  },
  {
    text: 'Tools',
    items: [
      { text: 'Linux', link: '/tools/linux/command-line-proxy' },
      { text: 'Shell Script', link: '/tools/shell-script/' },
      { text: 'Neovim', link: '/tools/neovim/install' },
      { text: 'Windows', link: '/tools/windows/dev-environment' },
      { text: 'Git', link: '/tools/git/' },
      { text: 'DevOps', link: '/tools/devops' },
    ],
  },
]

export default nav
