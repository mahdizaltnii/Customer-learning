import { defineStore } from "pinia";
import axios from "axios";
import type {Chapter} from "@/types/chapter";

const apiURL = "http://localhost:3000/api/chapters";

export const useChapterStore = defineStore("chapter", {
    
    state:(): {
        chapters: Chapter[]
        chapter: Chapter | null
        error: any
        
    } => ({
        chapters: [],
        chapter: null,
        error: null
    }),
    actions:{
        async fetchChapters(){
            try{
                const response = await axios.get<Chapter[]>(`${apiURL}`)
                this.chapters = response.data
            }
            catch(error){
                this.error = error
            }
            
        },
        async fetchChapterById(id: number){
            try{
                const response = await axios.get(`${apiURL}/${id}`)
                this.chapter = response.data
            }
            catch(error){
                this.error = error
            }
        },

        async fetchChaptersByCourseId(courseId: number){
            try{
                const response = await axios.get<Chapter[]>(`${apiURL}/${courseId}/chapters`)
                this.chapters = response.data
            }
            catch(error){
                this.error = error
            }
        }
    

        
    }
})
