import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      redirect:'index'
    },
    {
      path:'/login',
      name:'login',
      component:()=>import('@/views/Login.vue')
    },
    {
      path:'/index',
      name:'index',
      component:()=>import('@/views/Index.vue'),
      children:[
        {
          path:'/home',
          name:'home',
          component:()=>import('@/views/Home.vue')
        },
        {
          path:'/photo',
          name:'photo',
          component:()=>import('@/views/Photo.vue')
        },
        {
          path:'/allFile',
          name:'allFile',
          component:()=>import('@/views/AllFile.vue')
        }
      ]
    }
  ]
})

export default router
