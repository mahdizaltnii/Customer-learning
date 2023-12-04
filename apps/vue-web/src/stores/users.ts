import type { User } from '@/types/users'
import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user-store',
  state: () => ({
    currentUser: null as User | null,
    loading: false,
    error: null
  }),
  getters: {
    isAdmin(): boolean {
      return true
    }
  },
  actions: {
    async hydrate() {},
    async dehydrate() {
      this.$reset()
    }
  }
})
