import { NavGenerator } from './NavGenerator.js'
import { SidebarGenerator } from './SidebarGenerator.js'

await Promise.all([
  new NavGenerator().generate(),
  new SidebarGenerator().generate(),
]).then(() => {
  console.log(
    '[auto-gen-sidebar-and-nav] Sidebar and nav regenerated successfully'
  )
})
