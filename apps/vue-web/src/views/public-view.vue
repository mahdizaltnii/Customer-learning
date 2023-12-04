<script setup lang="ts">
import Header from '@/components/v-header.vue'
</script>

<template>
  <div class="relative w-full" >
    <Header></Header>

    <div class="container mx-auto min-h-full w-full overflow-y-auto p-6 lg:px-10">
      <slot ></slot>
    </div>
  </div>
</template>
