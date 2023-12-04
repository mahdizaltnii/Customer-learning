<template>
  <div dir="rtl" class="container mx-auto px-6 lg:px-10">
    <div class="flex border-b-2 justify-between w-full mx-auto">
      <div class="flex items-center gap-10">
        <img src="../assets/logo.png" alt="" class="p-1 py-4 w-24" />

        <div class="flex gap-2 items-center">
          <div
            class="text-sm font-bold text-opacity-80 leading-7 font-changa text-midnight"
            :class="{ 'text-yellow-500': $route.name === 'main-home' }"
          >
            <router-link :to="{ path: '/home' }">{{ t('main') }}</router-link>
          </div>
          <div
            class="text-sm font-bold text-opacity-80 leading-7 font-changa text-midnight"
            :class="{
              'text-yellow-500':
                $route.name === 'courses' ||
                $route.name === 'all-courses' ||
                $route.name === 'lesson'
            }"
          >
            <router-link :to="{ path: 'courses' }">{{ t('navigate') }}</router-link>
          </div>
        </div>
      </div>

      <div class="flex gap-2 items-center">
        <div class="text-sm font-bold text-opacity-80 leading-6 font-changa text-midnight">
          <router-link :to="{ name: 'signin' }">{{ t('sign-in') }}</router-link>
        </div>
        <div
          class="flex items-center text-sm font-bold font-changa text-midnight/80 bg-yellow-500 w-28 h-9 justify-center rounded-lg"
        >
          <router-link :to="{ name: 'signup' }">{{ t('sign-up') }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
