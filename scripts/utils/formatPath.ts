import path from 'node:path'

/** 格式化路径为 POSIX 格式 */
export function formatPath(itemPath: string) {
  return itemPath.split(path.sep).join('/')
}
