import fs from 'node:fs'
import path from 'node:path'

/**
 * 递归获取目录内容
 * @param {string} folderPath
 * @param {function} callback
 */
export function recursiveFolder(folderPath, callback) {
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
