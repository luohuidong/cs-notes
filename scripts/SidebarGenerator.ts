import fs from 'fs'
import path from 'path'
import * as marked from 'marked'
import { fileURLToPath } from 'url'
import { glob } from 'glob'
import { parseSync, printSync } from '@swc/core'
import * as prettier from 'prettier'
import type { DefaultTheme } from 'vitepress'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export class NoteSidebarGenerator {
  linkPrefix: string

  constructor(linkPrefix: string) {
    this.linkPrefix = linkPrefix
  }

  parseTocFile = (filePath: string) => {
    const markdown = fs.readFileSync(filePath, 'utf-8')
    const tokens = marked.lexer(markdown)
    return this.#convertToSidebar(tokens)
  }

  #convertToSidebar = (tokens: marked.TokensList): DefaultTheme.SidebarItem => {
    const sidebarItem: DefaultTheme.SidebarItem = {
      text: '',
      items: [],
    }

    for (const token of tokens) {
      if (token.type === 'heading') {
        const headerToken = token as marked.Tokens.Heading
        const textToken = headerToken.tokens[0] as marked.Tokens.Text
        sidebarItem.text = textToken.text
      } else if (token.type === 'list') {
        const items = this.#processList(token as marked.Tokens.List)
        sidebarItem.items = items
      }
    }

    return sidebarItem
  }

  #processList = (list: marked.Tokens.List): DefaultTheme.SidebarItem[] => {
    const sidebarItem: DefaultTheme.SidebarItem[] = []

    for (const item of list.items) {
      const childTokens = item.tokens

      const linkItem: DefaultTheme.SidebarItem = {
        text: '',
      }

      // 处理链接
      if (childTokens.length === 1) {
        const tmpToken = (childTokens[0] as marked.Tokens.Text)
          .tokens?.[0] as marked.Tokens.Link
        linkItem.text = tmpToken.text
        linkItem.link = path.join(this.linkPrefix, tmpToken.href)
      }

      // 处理子列表
      if (childTokens.length > 1) {
        const textToken = childTokens[0] as marked.Tokens.Text
        const listToken = childTokens[1] as marked.Tokens.List
        linkItem.text = textToken.text
        linkItem.items = this.#processList(listToken)
      }

      sidebarItem.push(linkItem)
    }

    return sidebarItem
  }
}

export class SidebarGenerator {
  docsDirPath = path.resolve(__dirname, '../docs')
  tocFiles = glob.sync(path.resolve(__dirname, '../docs/*/*/index.md'))
  outputPath = path.resolve(__dirname, '../docs/.vitepress/sidebar.ts')

  generate = async () => {
    const sidebar: DefaultTheme.SidebarMulti = {}

    for (const filePath of this.tocFiles) {
      const relativePath = path.relative(
        this.docsDirPath,
        path.dirname(filePath)
      )

      const key = `/${relativePath}`
      const sidebarItem = new NoteSidebarGenerator(key).parseTocFile(filePath)
      sidebar[key] = [sidebarItem]
    }

    const code = await this.#generateCode(sidebar)
    fs.writeFileSync(this.outputPath, code, 'utf-8')
  }

  #generateCode = (sidebar: DefaultTheme.SidebarMulti) => {
    const ast = parseSync(
      `import type { DefaultTheme } from 'vitepress';
const sidebar: DefaultTheme.SidebarMulti = ${JSON.stringify(sidebar, null, 2)};
export default sidebar;`,
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
