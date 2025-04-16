import fs from 'node:fs'
import path from 'node:path'
import _ from 'lodash'
import { SidebarGenerator } from './SidebarGenerator.js'
import { NavGenerator } from './NavGenerator.js'

const debounceGenerate = _.debounce(async () => {
  const sidebarGenerator = new SidebarGenerator()
  const navGenerator = new NavGenerator()
  await sidebarGenerator.generate()
  await navGenerator.generate()
}, 1000)

fs.watch('docs', { recursive: true }, (eventType, filename) => {
  if (!filename) return
  if (filename.startsWith('.vitepress')) return

  const result = path.parse(filename)
  if (result.name === 'index' && result.ext === '.md') {
    debounceGenerate()
  }
})

console.log('watching...')
