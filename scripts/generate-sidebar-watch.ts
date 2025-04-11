import fs from 'node:fs'
import path from 'node:path'
import { debounce } from 'lodash'

const sidebarGenerator = new SidebarGenerator()

const debounceGenerateSidebar = debounce(async () => {
  await sidebarGenerator.generate()
}, 1000)

import { SidebarGenerator } from './SidebarGenerator.js'

fs.watch('docs', { recursive: true }, (eventType, filename) => {
  if (!filename) return

  const result = path.parse(filename)
  if (result.name === 'index' && result.ext === '.md') {
    debounceGenerateSidebar()
  }
})

sidebarGenerator.generate()

console.log('watching...')
