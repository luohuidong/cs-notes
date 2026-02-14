import path from 'path'
import { fileURLToPath } from 'url'
import type { Plugin } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export function sidebarAutoGenPlugin(): Plugin {
  return {
    name: 'sidebar-auto-gen',

    configureServer: async (server) => {
      // Dynamically import the SidebarGenerator to avoid bundling issues
      const { SidebarGenerator } = await import('./SidebarGenerator.js')
      const { NavGenerator } = await import('./NavGenerator.js')

      const sidebarGenerator = new SidebarGenerator()
      const navGenerator = new NavGenerator()

      sidebarGenerator.generate()
      navGenerator.generate()

      // Watch for file changes in docs directory (excluding .vitepress)
      server.watcher.on('add', (filePath) => {
        if (shouldRegenerate(filePath)) {
          regenerate(sidebarGenerator, navGenerator)
        }
      })

      server.watcher.on('unlink', (filePath) => {
        if (shouldRegenerate(filePath)) {
          regenerate(sidebarGenerator, navGenerator)
        }
      })
    },
  }
}

/**
 * Check if the file change should trigger sidebar regeneration
 * Only markdown files in docs directory (excluding .vitepress) should trigger
 */
function shouldRegenerate(filePath: string): boolean {
  // Only process markdown files
  if (!filePath.endsWith('.md')) {
    return false
  }

  // Convert to relative path from docs directory
  const docsDir = path.resolve(process.cwd(), 'docs')
  const relativePath = path.relative(docsDir, filePath)

  // Exclude .vitepress directory
  if (relativePath.startsWith('.vitepress')) {
    return false
  }

  return true
}

/**
 * Regenerate sidebar and nav
 */
async function regenerate(
  sidebarGenerator: { generate: () => Promise<void> },
  navGenerator: { generate: () => Promise<void> }
): Promise<void> {
  try {
    console.log(
      '[sidebar-auto-gen] Markdown file added/deleted, regenerating sidebar...'
    )
    await sidebarGenerator.generate()
    await navGenerator.generate()
    console.log('[sidebar-auto-gen] Sidebar and nav regenerated successfully')
  } catch (error) {
    console.error('[sidebar-auto-gen] Error regenerating sidebar:', error)
  }
}
