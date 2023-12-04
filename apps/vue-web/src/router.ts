import { type RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import LessonVue from './views/LessonView.vue'
import vSignInVue from '@/routes/login/v-sign-in.vue'
import vSignUpVue from '@/routes/register/v-sign-up.vue'
import vForgotPasswsordVue from '@/routes/forget/v-forgot-password.vue'
import vResetPassword from '@/routes/reset/v-reset-password.vue'
import { hydrate } from './hydrate'
import { useAppStore } from './stores/app'
import { useAuthStore } from './stores/auth'
const defaultRoutes: RouteRecordRaw[] = [
  {
    path: '',
    redirect: '/sign-in'
  },

  {
    name: 'lesson',
    path: '/lesson',

    component: LessonVue
  },
  {
    name: 'signup',
    path: '/sign-up',
    component: vSignUpVue,
    meta: {
      public: true
    }
  },
  {
    name: 'signin',
    path: '/sign-in',
    component: vSignInVue,
    meta: {
      public: true
    }
  },
  {
    name: 'forgotpassword',
    path: '/forgot-password',

    component: vForgotPasswsordVue,
    
  },
  {
    name: 'resetpassword',
    path: '/reset-password/:token',
    component: vResetPassword,
    meta: {
      public: true
    }
  },
  

]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: defaultRoutes
})

let firstLoad = true
router.beforeEach(async (to, from) => {
  const authStore = useAuthStore()
  const appStore = useAppStore()
  // First load
  if (firstLoad) {
    firstLoad = false
    // Try hydrate store on first load
    try {
      appStore.hydrate()
    } catch {
      // Ignore error
    }
  }

  // TODO: need to be linked and fixed with authentication, this is just a mock guard to prevent access to unloaded routes
  if (!to.meta.public) {
    if (appStore.hydrated === false) {
      appStore.isHydrating = false
      await hydrate()
      return to.fullPath
    }
  }
  //TODO: add when api and authentication ready
  // if (!to.meta.public) {
  //   if (appStore.hydrated === false) {
  //     appStore.hydrating = false
  //     if (authStore.isAuthenticated) {
  //       try {
  //         await hydrate()
  //       } catch {
  //         // Ignore error
  //       }
  //       return to.fullPath
  //     } else {
  //       if (to.fullPath) {
  //         return '/login?redirect=' + encodeURIComponent(to.fullPath)
  //       } else {
  //         return '/login'
  //       }
  //     }
  //   }
  // }
})
