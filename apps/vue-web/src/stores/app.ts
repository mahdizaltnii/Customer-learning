import { setLanguage } from '@/lang/set-language'
import { defineStore } from 'pinia'

export const useAppStore = defineStore({
  id: 'app-store',
  state: () => ({
    isSideBarOpen: window.innerWidth >= 1366,
    hydrated: false,
    isHydrating: false,
    error: null as Error | null
  }),
  actions: {
    async hydrate() {
      await setLanguage('ar')
    },
    async dehydrate() {
      this.$reset()
    },
    toggleSideBar() {
      this.isSideBarOpen = !this.isSideBarOpen
    },
    closeSideBar() {
      this.isSideBarOpen = false
    },
    openSideBar() {
      this.isSideBarOpen = true
    }
  }
})
