import { createRouter, createWebHistory } from 'vue-router'
import Home from "../pages/home/index.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/home', component: Home },
    //{ path: '/workflow_visulization', component: Workflow_visulization },
    //{ path: '/workflow_comparison', component: Workflow_comparison },
  ]
})

export default router
