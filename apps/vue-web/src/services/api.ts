import { i18n } from '@/lang'
import { useAuthStore } from '@/stores/auth'
import axios, { AxiosError, type AxiosRequestConfig } from 'axios'
import PQueue, { type Options, type DefaultAddOptions } from 'p-queue'

let queue = new PQueue({
  concurrency: 5,
  intervalCap: 5,
  interval: 500,
  carryoverConcurrencyCount: true
})

const api = axios.create({
  baseURL: import.meta.env['VITE_API_URL'],
  headers: {
    'Accept-Language': i18n.global.locale.value
  }
})
const onRequest = (config: AxiosRequestConfig): Promise<any> => {
  api.defaults.headers.common['Authorization'] = localStorage.getItem('token')
  return new Promise((resolve) => {
    queue.add(() => resolve(config))
  })
}
const onError = async (error: AxiosError): Promise<AxiosError> => {
  const authStore = useAuthStore()
  const status = error.response?.status
  if (status === 401) {
    authStore.logout()
    return Promise.reject(error)
  }
  return Promise.reject(error)
}
api.interceptors.request.use(onRequest)
api.interceptors.response.use((res) => res, onError)
export default api
export function getToken(): string | null {
  return (api.defaults.headers.common['Authorization'] as string) || null
}
export async function replaceQueue(options?: Options<any, DefaultAddOptions>) {
  await queue.onIdle()
  queue = new PQueue(options)
}
