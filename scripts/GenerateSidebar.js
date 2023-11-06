import fs from 'node:fs'
import path from 'node:path'
import yaml from 'js-yaml'

import { recursiveFolder, formatPath } from './utils/index.js'

export class GenerateSidebar {
  #rootDir = 'docs'
  #sidebarConfigFilePaths = []

  /** 递归获取 docs 目录下所有 sidebar.yml 文件的路径 */
  #recursiveGetSidebarConfigFilePaths = (dirPath) => {
    recursiveFolder(dirPath, ({ itemsPath, isDirectory }) => {
      if (isDirectory) return

      if (path.parse(itemsPath).base === 'sidebar.yml') {
        this.#sidebarConfigFilePaths.push(itemsPath)
      }
    })

    return this.#sidebarConfigFilePaths
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

  generate() {
    const sidebarConfigFilePaths = this.#recursiveGetSidebarConfigFilePaths(this.#rootDir)

    const sidebar = {}
    // 读取所有
    sidebarConfigFilePaths.forEach((sidebarConfigFilePath) => {
      const config = yaml.load(fs.readFileSync(sidebarConfigFilePath, { encoding: 'utf8' }))

      sidebarConfigFilePath = sidebarConfigFilePath.replace('docs', '')
      const result = path.parse(sidebarConfigFilePath)
      sidebar[formatPath(result.dir)] = this.#addLinkPrefix(config, result.dir)
    })

    fs.writeFileSync('./docs/.vitepress/sidebar.ts', `export default ${JSON.stringify(sidebar, null, 2)}`)
  }
}
