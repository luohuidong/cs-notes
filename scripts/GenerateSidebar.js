import fs from 'node:fs'
import path from 'node:path'
import yaml from 'js-yaml'

import { recursiveFolder, formatPath } from './utils/index.js'

export class GenerateSidebar {
  #rootDir = 'docs'

  /** 递归获取 docs 目录下所有 sidebar.yml 文件的路径 */
  #allSidebarConfigFilePaths = (dirPath) => {
    const sidebarConfigFilePaths = []

    recursiveFolder(dirPath, ({ itemsPath, isDirectory }) => {
      if (isDirectory) return

      if (path.parse(itemsPath).base === 'sidebar.yml') {
        sidebarConfigFilePaths.push(itemsPath)
      }
    })

    return sidebarConfigFilePaths
  }

  #addLinkPrefix = (items, dir) => {
    items.forEach((item) => {
      Reflect.ownKeys(item).forEach((key) => {
        if (key === 'link') {
          item[key] = formatPath(path.join(dir, item[key]))
        }

        if (key === 'items') {
          this.#addLinkPrefix(item[key], dir)
        }
      })
    })

    return items
  }

  /**
   * 递归增加 collapsed 属性
   * @param {array} config
   */
  #addCollapased = (config) => {
    config.forEach((item) => {
      if (item.items) {
        item.collapsed = false
        this.#addCollapased(item.items)
      }
    })
  }

  generate() {
    const sidebarConfigFilePaths = this.#allSidebarConfigFilePaths(this.#rootDir)

    const sidebar = {}
    // 读取所有 sidebar 配置文件
    sidebarConfigFilePaths.forEach((sidebarConfigFilePath) => {
      const config = yaml.load(fs.readFileSync(sidebarConfigFilePath, { encoding: 'utf8' }))
      config.forEach((item) => {
        // 二级菜单默认展开
        this.#addCollapased(item.items)
      })

      sidebarConfigFilePath = sidebarConfigFilePath.replace('docs', '')
      const result = path.parse(sidebarConfigFilePath)
      sidebar[formatPath(result.dir)] = this.#addLinkPrefix(config, result.dir)
    })

    fs.writeFileSync('./docs/.vitepress/sidebar.ts', `export default ${JSON.stringify(sidebar, null, 2)}`)
  }
}
