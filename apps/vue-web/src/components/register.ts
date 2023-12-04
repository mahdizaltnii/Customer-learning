import type { App } from 'vue'
import Card from './v-card.vue'
import HeaderVue from './v-header.vue'

export function registerComponents(app: App): void {
  app.component('Header', HeaderVue)
  app.component('Card', Card)

}
