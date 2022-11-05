import { createRouter, createWebHistory } from 'vue-router'
import MyDayView from '../views/MyDayView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: MyDayView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
