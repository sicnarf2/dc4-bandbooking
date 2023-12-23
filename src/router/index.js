import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Band from '../views/Band.vue'
import User from '../views/User.vue'
import Booking from '../views/Booking.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/band',
      name: 'band',
      component: Band
    },


    {
      path: '/user',
      name: 'user',
      component: User
    },
    
    {
      path: '/booking',
      name: 'booking',
      component: Booking
    }
  ]
})

export default router
