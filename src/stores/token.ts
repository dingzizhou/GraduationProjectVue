import { defineStore } from 'pinia'

export const useTokenStore = defineStore('token',{
    state:()=>({
        token:"devToken",
        type:"0",
    }),

    actions:{
        setToken(token: string){
            this.token = token
        },
        setType(type:string){
            this.type = type
        }
    }
})