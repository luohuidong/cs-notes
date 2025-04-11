import type { DefaultTheme } from 'vitepress'

const nav: DefaultTheme.NavItem[] = [
  {
    text: 'CS',
    items: [
      { text: '数据结构', link: '/cs/data-structure/' },
      { text: '算法', link: '/cs/algorithm/' },
      { text: 'leetcode', link: '/cs/leetcode/' },
      { text: '设计模式', link: '/cs/design-pattern/' },
      { text: '计算机组成原理', link: '/cs/computer-organization-and-architecture/' },
    ],
  },
  {
    text: 'Frontend',
    items: [
      { text: 'Babel', link: '/frontend/babel/' },
      { text: 'JavaScript 对象', link: '/frontend/object/' },
      { text: 'Web Components', link: '/frontend/web-components/' },
    ],
  },
  {
    text: 'Backend',
    items: [{ text: 'MySQL', link: '/backend/mysql/' }],
  },
  {
    text: 'Tools',
    items: [
      { text: 'Linux', link: '/tools/linux/' },
      { text: 'Shell Script', link: '/tools/shell-script/' },
      { text: 'Neovim', link: '/tools/neovim/' },
      { text: 'Windows', link: '/tools/windows/' },
      { text: 'Git', link: '/tools/git/' },
      { text: 'DevOps', link: '/tools/devops/' },
    ],
  },
]

export default nav
