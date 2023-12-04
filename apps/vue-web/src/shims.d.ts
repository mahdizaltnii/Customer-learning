declare module '*.md' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.yaml' {
  const value: Record<string, any>
  export default value
}

declare module '*.json' {
  const value: Record<string, any>
  export default value
}
