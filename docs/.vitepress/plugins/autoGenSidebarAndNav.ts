import path from 'node:path'
import type { Plugin } from 'vite'

import { SidebarGenerator } from '../../../scripts/SidebarGenerator.js'
import { NavGenerator } from '../../../scripts/NavGenerator.js'

export function sidebarAutoGenPlugin(): Plugin {
  return {
    name: 'auto-gen-sidebar-and-nav',

    watchChange(id, { event }) {
      const { base } = path.parse(id)

      if (base !== 'index.md') return

      // index.md 内容变化时，重新生成侧边栏
      if (event === 'update') {
        new SidebarGenerator().generate().then(() => {
          console.log(
            '[auto-gen-sidebar-and-nav] Sidebar regenerated successfully'
          )
        })
      }

      // index.md 增加或删除时，重新生成侧边栏和导航
      if (event === 'create' || event === 'delete') {
        Promise.all([
          new SidebarGenerator().generate(),
          new NavGenerator().generate(),
        ]).then(() => {
          console.log(
            '[auto-gen-sidebar-and-nav] Sidebar and nav regenerated successfully'
          )
        })
      }
    },
  }
}
