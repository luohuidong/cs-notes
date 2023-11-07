import fs from 'node:fs'
import path from 'node:path'

/** 递归获取目录内容 */
export function recursiveFolder(
  folderPath: string,
  callback: (item: { itemsPath: string; isDirectory: boolean }) => void
) {
  fs.readdirSync(folderPath).forEach((item) => {
    const itemsPath = path.join(folderPath, item)

    const stat = fs.statSync(itemsPath)
    if (stat.isDirectory()) {
      callback({
        itemsPath,
        isDirectory: true,
      })
      recursiveFolder(itemsPath, callback)
    } else {
      callback({
        itemsPath,
        isDirectory: false,
      })
    }
  })
}
