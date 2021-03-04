import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/views/Home";

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/flight/:id',
    name: 'Flight',
    component: ()=> import('../views/Flight')
  },
  {
    path: '/agents',
    name: 'Agents',
    component: ()=> import('../views/Agents')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: 'active',
  linkActiveClass: 'active'
})

export default router
