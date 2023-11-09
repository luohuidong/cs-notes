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
    items: [{ text: '算法', link: '/cs/algorithm/sort/bubble-sort' }],
  },
  {
    text: 'Linux',
    items: [{ text: 'Shell Script', link: '/linux/shell-script/what-is-shell-script' }],
  },
]

export default nav
