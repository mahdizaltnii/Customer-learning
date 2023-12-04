import { defineModule } from '@/utils'
import HomeVue from './routes/HomeView.vue'
export default defineModule({
  id: 'home',
  name: 'home',
  routes: [
    {
      name: 'main-home',
      path: '',
      component: HomeVue
    }
  ]
})
