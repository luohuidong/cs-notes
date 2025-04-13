import fs from 'fs'
import path from 'path'
import * as marked from 'marked'
import { fileURLToPath } from 'url'
import { parseSync, printSync } from '@swc/core'
import * as prettier from 'prettier'
import type { DefaultTheme } from 'vitepress'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export class NavGenerator {
  docsDirPath = path.resolve(__dirname, '../docs')
  outputPath = path.resolve(__dirname, '../docs/.vitepress/nav.ts')

  nav: DefaultTheme.NavItem[] = []

  generate = async () => {
    this.#getNav()
    const code = await this.#generateCode()
    fs.writeFileSync(this.outputPath, code, 'utf-8')
  }

  #getNav = () => {
    // 遍历二级目录，获取所有 nav 分组
    // 目录字符串长度为2，则全部大写。目录字符串长度大于2，则首字母大写
    const groups = fs
      .readdirSync(this.docsDirPath, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory() && dirent.name !== '.vitepress')
      .map((dirent) => dirent.name)

    // 遍历三级目录，获取所有 note 标题
    for (const group of groups) {
      const navItem: DefaultTheme.NavItem = {
        text:
          group.length <= 2
            ? group.toUpperCase()
            : group.charAt(0).toUpperCase() + group.slice(1),
        items: [],
      }

      const groupPath = path.join(this.docsDirPath, group)
      const noteFolderNames = fs
        .readdirSync(groupPath, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name)

      // 获取 index.md 标题
      for (const noteDirName of noteFolderNames) {
        const noteDirPath = path.resolve(groupPath, noteDirName)
        const filePath = path.resolve(noteDirPath, 'index.md')
        const title = this.#getFileTitle(filePath)
        const link = `/${group}/${noteDirName}/`
        const navItemChild: DefaultTheme.NavItem = {
          text: title,
          link,
        }
        navItem.items.push(navItemChild)
      }

      this.nav.push(navItem)
    }
  }

  #getFileTitle = (filePath: string) => {
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const tokens = marked.lexer(fileContent)
    let title = ''

    for (const token of tokens) {
      if (token.type === 'heading') {
        const headerToken = token as marked.Tokens.Heading
        const textToken = headerToken.tokens[0] as marked.Tokens.Text
        title = textToken.text
        break
      }
    }

    return title
  }

  #generateCode = () => {
    const ast = parseSync(
      `import type { DefaultTheme } from 'vitepress';
const nav: DefaultTheme.NavItem[] = ${JSON.stringify(this.nav, null, 2)};
export default nav;`,
      {
        syntax: 'typescript',
      }
    )
    const { code } = printSync(ast)
    return this.#formatCode(code)
  }

  #formatCode = async (code: string) => {
    const configFile = path.resolve(__dirname, '../.prettierrc')
    const options = await prettier.resolveConfig(configFile)

    const formattedCode = await prettier.format(code, {
      ...options,
      parser: 'typescript',
    })

    return formattedCode
  }
}
