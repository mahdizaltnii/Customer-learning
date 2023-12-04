import { defineModule } from '@/utils'
import CoursesVue from './routes/CoursesView.vue'
import CourseVue from './routes/CourseView.vue'
export default defineModule({
  id: 'courses',
  name: 'courses',
  routes: [
    {
      name: 'all-courses',
      path: '',
      component: CoursesVue
    },
    {
      name: 'course',
      path: ':id',
      component: CourseVue
    }
  ]
})
