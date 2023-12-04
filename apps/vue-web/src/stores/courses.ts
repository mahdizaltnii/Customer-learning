import { defineStore } from 'pinia'
import axios from 'axios'
import type Course from '@/types/course'
const apiURL = 'http://localhost:3000/api/course'

export const useCourseStore = defineStore('course', {
  state: (): {
    courses: Course[]
    course: Course | null
    error: any
  } => ({
    courses: [],
    course: null,
    error: null
  }),
  actions: {
    async fetchCourses() {
      try {
        const response = await axios.get<Course[]>(`${apiURL}`)
        this.courses = response.data
      } catch (error) {
        this.error = error
      }
    },
    async fetchCourseById(id: number) {
      try {
        const response = await axios.get(`${apiURL}/${id}`)
        this.course = response.data
      } catch (error) {
        this.error = error
      }
    },
    async createCourse(courseData: Course) {
      try {
        const response = await axios.post(`${apiURL}`, courseData)
        this.courses.push(response.data)
      } catch (error) {
        this.error = error
      }
    },
    async updateCourse(id: number, courseData: Course) {
      try {
        const response = await axios.put(`${apiURL}/${id}`, courseData)
        const index = this.courses.findIndex((course) => course.id === id)
        this.courses[index] = response.data
      } catch (error) {
        this.error = error
      }
    },
    async deleteCourse(id: number) {
      try {
        await axios.delete(`${apiURL}/${id}`)
        this.courses = this.courses.filter((course) => course.id !== id)
      } catch (error) {
        this.error = error
      }
    },
    async affectCourseToCategory(categoryId: number, courseData: Course) {
      try {
        const response = await axios.post(
          `${apiURL}/AffectcourseToCategory/${categoryId}`,
          courseData
        )
        this.courses.push(response.data)
      } catch (error) {
        this.error = error
      }
    }
  }
})
