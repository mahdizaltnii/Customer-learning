<template>
  <div class="relative w-full">
<Header></Header>
    <div class="container mx-auto min-h-full w-full overflow-y-auto p-6 lg:px-10" dir="rtl">
      <div class="flex flex-col mt-14">
        <h1 class="text-xl font-bold font-changa text-midnight">
          {{ t('subjects') }}
        </h1>

        <div class="grid grid-cols-1 gap-8 mt-8 items-center lg:grid-cols-4">
          <vCard />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import vCard from '@/components/v-card.vue'
const { t } = useI18n()
</script>
