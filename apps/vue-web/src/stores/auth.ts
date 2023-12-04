import { defineStore } from 'pinia'
import api from '@/services/api'
import { router } from '@/router'
import axios from 'axios'
const apiURL = 'http://localhost:3000/api/auth'

type LoginBody = {
  email: string
  password: string
}

export const useAuthStore = defineStore({
  id: 'auth-store',
  state: () => ({
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    error: null as Error | null,
    message: null as string | null,
    email: ''
  }),
  getters: {
    getIsAuthenticated(state): boolean {
      return state.isAuthenticated
    }
  },
  actions: {
    async hydrate() {},
    async dehydrate() {
      this.$reset()
    },
    async authCheck() {},

    async login(data: LoginBody) {
      try {
        this.isLoading = true
        const response = await axios.post(`${apiURL}/login`, data)
        localStorage.setItem('token', response.data.token)
        this.isAuthenticated = true
        router.push({ name: 'home' })
      } catch (error) {
        this.error = {
          name: 'UnknownError',
          message: String(error) // Convert the error to string in case it's not an object
        }
      } finally {
        this.isLoading = false
      }
    },

    async forgotPassword(email: string) {
      try {
        this.isLoading = true
        await axios.post(
          `${apiURL}/forgotPasswordd`,
          { email },
          {
            headers: { 'Content-Type': 'application/json' }
          }
        )
        this.message = 'Please check your email for password reset instructions!'
      } catch (error) {
        this.error = {
          name: 'UnknownError',
          message: String(error) // Convert the error to string in case it's not an object
        }
      } finally {
        this.isLoading = false
      }
    },
    async resetPassword(token: string, newPassword: string) {
      try {
        this.isLoading = true

        // Send request to reset password
        const response = await axios.post(`${apiURL}/resetPassword/${token}`, {
          newPassword
        })

        // Handle response (optional, based on what you want to do next)
        if (response.data && response.data.message === 'Password reset successfully') {
          // You can set some state here or redirect user, etc.
          this.message = 'Password reset successfully!'
        } else {
          throw new Error('Failed to reset password')
        }
      } catch (error) {
        this.error = {
          name: 'UnknownError',
          message: String(error)
        }
      } finally {
        this.isLoading = false
      }
    },

    logout() {
      this.isLoading = true
      delete api.defaults.headers.common['Authorization']
      localStorage.removeItem('token')
      this.token = ''
      this.isAuthenticated = false
      this.isLoading = false
      router.replace({ name: 'login' })
    }
  }
})
