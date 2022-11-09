import { createRouter, createWebHistory } from 'vue-router'
import MyDayView from '../views/MyDayView.vue'
import ImportantTaskView from '../views/ImportantTaskView.vue'
import AllTaskView from '../views/AllTaskView.vue'
import SearchTaskView from '../views/SearchTaskView.vue'
import CustomListView from '../views/CustomListView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: MyDayView
  },
  {
    path: '/important',
    name: 'important',
    component: ImportantTaskView 
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: AllTaskView
  },
  {
    path: '/search',
    name: 'search',
    component: SearchTaskView,
  },
  {
    path: '/list/:id',
    name: 'list',
    component: CustomListView,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
