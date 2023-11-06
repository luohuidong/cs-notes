import path from 'node:path'

/**
 * 格式化路径为 POSIX 格式
 * @param {string} itemPath
 */
export function formatPath(itemPath) {
  return itemPath.split(path.sep).join('/')
}
