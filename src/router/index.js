import { createRouter, createWebHistory } from 'vue-router'
import Home from "../pages/home/index.vue";
import WV from "../pages/workflow_visualization/index.vue";
import WC from "../pages/workflow_comparison/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/home', component: Home },
    { path: '/workflow_visulization', component: WV },
    { path: '/workflow_comparison', component: WC },
  ]
})

export default router
