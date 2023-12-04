<script setup lang="ts">
import {  RouterView } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAppStore } from './stores/app'

const appStore = useAppStore()
const { isHydrating } = storeToRefs(appStore)
</script>

<template>
  <div v-if="isHydrating" class="fixed z-50" >Loading</div>
  <router-view  v-else-if="!isHydrating"></router-view>
</template>
