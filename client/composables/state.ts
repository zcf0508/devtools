import { $fetch } from 'ohmyfetch'
import type { ModuleBuiltinTab, ModuleCustomTab, ModuleInfo } from '../../src/types'

let modules: ModuleInfo[] | undefined

export async function useModulesInfo() {
  if (modules)
    return modules
  modules = await $fetch('https://cdn.jsdelivr.net/npm/@nuxt/modules@latest/modules.json')
  return modules
}

export async function getTabs() {
  const router = useRouter()
  const routes = router.getRoutes()
  const custom = (await rpc.getCustomTabs()).map((i): ModuleCustomTab => {
    return {
      ...i,
      path: `/modules/custom-${i.name}`,
    }
  })

  const builtin = routes
    .filter(route => route.path.startsWith('/modules/') && route.meta.title && !route.meta.wip)
    .sort((a, b) => (a.meta.order || 0) - (b.meta.order || 0))
    .map((i): ModuleBuiltinTab => {
      return {
        name: i.name as string,
        path: i.path,
        icon: i.meta.icon,
        title: i.meta.title,
      }
    })

  return {
    custom,
    builtin,
  }
}

export const tabsInfoCustom: ModuleCustomTab[] = []
export const tabsInfoBuiltin: ModuleBuiltinTab[] = []