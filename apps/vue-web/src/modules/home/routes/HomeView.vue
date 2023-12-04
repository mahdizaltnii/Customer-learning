<template>
  <Header></Header>
  <div class="flex flex-col gap-4 my-3 space-y-2 items-center">
        <video src="src\assets\LPanimation.mp4" class="max-w-xl"></video>

        <div class="text-3xl font-bold font-changa opacity-100 text-midnight">
          {{ t('learn') }}
          <span class="text-yellow-500">{{ t('joodbooking') }}</span>
        </div>
        <div
          class="text-center leading-6 font-changa w-[790px] text-primary text-midnight line-clamp-4"
        >
          {{ t('learn-joodbooking') }}
        </div>

        <button
          class="flex items-center w-28 h-9 mb-4 justify-center space-x-1 rounded-lg bg-yellow-500 text-midnight font-changa text-sm font-semibold"
        >
        <img src="src\assets\icons\arrow.svg" alt="" class="w-5">         
          <RouterLink :to="{ name: 'all-courses' }" >{{ t('start') }}</RouterLink>
        </button>
      </div>
  
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
