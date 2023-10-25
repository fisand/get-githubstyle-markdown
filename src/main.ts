import { createApp } from 'vue'

import App from './App.vue'

// main.ts
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import 'github-markdown-css/github-markdown.css'
import 'github-markdown-css/github-markdown-light.css'

createApp(App).mount('#app')
