<script setup lang="ts">
import { Octokit } from '@octokit/core'
import { ref } from 'vue'
import { useClipboard } from '@vueuse/core'

import { Textarea } from '@/ui/textarea/index'
import { Button } from './ui/button'
import { Input } from './ui/input'

const loading = ref(false)
const html = ref('')
const token = ref('')
const markdown = ref('Hello **world**')
const { copy, copied } = useClipboard()

const getHTML = async () => {
  try {
    loading.value = true
    const kit = new Octokit({
      auth: token.value,
    })

    const res = await kit.request('POST /markdown', {
      text: markdown.value,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    })
    html.value = res.data
  } catch (error) {
    
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <a href="https://github.com/fisand/get-githubstyle-markdown" target="_blank">
    <img src="https://api.iconify.design/logos:github-icon.svg?color=%23888888" alt="" class="absolute top-2 right-4 w-6 h-6">
  </a>
  <div class="p-4 space-y-3">
    <div class="flex gap-2 flex-wrap">
      <Button variant="secondary" class="w-auto flex-shrink-0">Github token</Button>
      <Input v-model="token" class="w-200" placeholder="your github token" />
      <a href="https://github.com/settings/tokens" target="_blank">
        <Button variant="link">Get your github token</Button>
      </a>
    </div>
    <Textarea v-model="markdown" placeholder="markdown raw" />
    <Button variant="default" :disabled="loading || !token || !markdown" class="ml-auto flex items-center gap-1" @click="getHTML">
      <span v-show="loading" class="w-4 h-4 text-primary-foreground i-eos-icons:loading" />
      Get HTML
    </Button>
  </div>

  <div class="p-4 markdown-body relative border-t border-input">
    <Button v-if="html" size="sm" variant="outline" class="absolute top-4 right-4" @click="copy(html)">{{
      copied ? 'Copied' : 'Copy'
    }}</Button>
    <div v-html="html"></div>
  </div>
</template>
