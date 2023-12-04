import type { App } from 'vue'
import publicView from './public-view.vue'
export function registerViews(app: App): void {
  app.component('PublicView', publicView)
}
