import fs from 'node:fs'
import path from 'node:path'

import { GenerateSidebar } from './GenerateSidebar'

fs.watch('docs', { recursive: true }, (eventType, filename) => {
  if (!filename) return

  const result = path.parse(filename)
  if (result.name === 'sidebar' && result.ext === '.yml') {
    new GenerateSidebar().generate()
    console.log(`${new Date().toLocaleString()} - regenerate sidebar`)
  }
})

console.log('watching...')
