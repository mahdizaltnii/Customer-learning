import type { ModuleConfig } from '@/types'
import { shallowRef } from 'vue'
import { sortBy } from 'lodash'
import RouterPass from '@/utils/router-passthrough'
import { useUserStore } from '@/stores/users'
import { router } from '@/router'
import type { User } from '@/types/users'

export function getModules() {
  const modules = import.meta.glob<ModuleConfig>('./*/index.ts', { import: 'default', eager: true })
  return sortBy(Object.values(modules), 'id')
}

export function registerModules(modules: ModuleConfig[]) {
  const registeredModules = shallowRef<ModuleConfig[]>([])
  const onHydrateModules = async () => {
    const userStore = useUserStore()
    //TODO: fix it when authentication is ready
    // if (!userStore.currentUser) return

    registeredModules.value = (
      await Promise.all(
        modules.map(async (module) => {
          if (!module.preRegisterCheck) return module

          const allowed = await module.preRegisterCheck(userStore.currentUser as User)
          if (allowed) return module

          return null
        })
      )
    ).filter((module): module is ModuleConfig => module !== null)

    for (const module of registeredModules.value) {
      console.log("Registering module:", module.id);  // <-- Add this line
      router.addRoute({
        name: module.id,
        path: `/${module.id}`,
        component: RouterPass,
        children: module.routes
      })
      for (const route of module.routes) {
        console.log("Child route:", route.name);  // <-- Add this line
      }
    }
  }
  const onDehydrateModules = async () => {
    for (const module of modules) {
      
      router.removeRoute(module.id)
    }

    registeredModules.value = []
  }
  return { registeredModules, onHydrateModules, onDehydrateModules }
}
