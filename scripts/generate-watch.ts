import fs from 'node:fs'
import path from 'node:path'
import { debounce } from 'lodash'
import { SidebarGenerator } from './SidebarGenerator.js'
import { NavGenerator } from './NavGenerator.js'

const sidebarGenerator = new SidebarGenerator()
const navGenerator = new NavGenerator()

const debounceGenerate = debounce(async () => {
  await sidebarGenerator.generate()
  await navGenerator.generate()
}, 1000)

fs.watch('docs', { recursive: true }, (eventType, filename) => {
  if (!filename) return

  const result = path.parse(filename)
  if (result.name === 'index' && result.ext === '.md') {
    debounceGenerate()
  }
})

sidebarGenerator.generate()

console.log('watching...')
