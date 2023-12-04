import './assets/style.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { i18n } from './lang'
import { registerComponents } from './components/register'
import { registerDirective } from './directives/register'
import { registerViews } from './views/register'
import { registerAddons } from './addons'
import { router } from './router'

setup()
function setup() {
  console.time('🕓 Application Loaded')
  const app = createApp(App)

  app.use(createPinia())
  app.use(router)
  app.use(i18n)

  registerDirective(app)
  registerComponents(app)
  registerViews(app)
  registerAddons(app)

  app.mount('#app')
  console.timeEnd('🕓 Application Loaded')
  // Prevent the browser from opening files that are dragged on the window
  window.addEventListener('dragover', (e) => e.preventDefault(), false)
  window.addEventListener('drop', (e) => e.preventDefault(), false)
}
