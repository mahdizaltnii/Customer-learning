<script setup lang="ts">
import { onMounted } from 'vue'
import { useCourseStore } from '@/stores/courses'
import { storeToRefs } from 'pinia'

const courseStore = useCourseStore()
const { courses } = storeToRefs(courseStore)

onMounted(async () => {
  await courseStore.fetchCourses()
  console.log(courseStore.courses)
})
</script>

<template>
  <div
    v-for="course in courses"
    :key="course.id"
    class="flex flex-col relative max-w-2xl shadow-lg rounded-xl p-8"
  >
    <div class="flex items-start">
      <div
        :style="{ backgroundColor: course.color }"
        class="flex mx-4 items-center justify-center w-14 h-12 rounded-xl mr-1"
      >
        <!-- <img :src="`../assets/icons/${course.icon}.svg`" alt="" class="w-8" /> -->
        <!-- <img src="../assets/icons/sphere.svg"  alt="" class="w-8" /> -->
        <!-- <img :src="'../assets/icons/' + course.icon + '.svg'" alt="" class="w-8" /> -->
      </div>
      <div class="flex flex-col justify-start h-20">
        <h1 class="font-bold leading-7 font-changa text-midnight">
          <RouterLink :to="{ name: 'course', params: { id: course.id } }">{{ course.title }}</RouterLink>
        </h1>
        <p class="font-changa text-gray-400">قسم واحد</p>
      </div>
    </div>
    <p class="relative font-changa text-gray-400 text-sm line-clamp-3 bottom-4">
      {{ course.description }}
    </p>
    <RouterLink :to="{ name: 'course', params: { id: course.id } }"><img
      src="../assets/icons/arrow.svg"
      class="absolute bottom-4 left-3"
      alt=""
    /></RouterLink>

    
  </div>
</template>
