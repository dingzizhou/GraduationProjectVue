import { defineStore } from 'pinia'

export const useTokenStore = defineStore('token',{
    state:()=>({
        token:"devToken",
    }),

    actions:{
        setToken(token: string){
            this.token = token
        }
    }
})