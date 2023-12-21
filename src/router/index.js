import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Customer from '../views/Customer.vue'
import Order from '../views/Order.vue'
import Vehicle from '../views/Vehicle.vue'
import ArtistCreateView from '../views/ArtistCreateView.vue'
import AlbumCreateView from '../views/AlbumCreateView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/customer',
      name: 'customer',
      component: Customer
    },

    {
      path: '/order',
      name: 'order',
      component: Order
    },

    {
      path: '/vehicle',
      name: 'vehicle',
      component: Vehicle
    },

    // {
    //   path: '/artistcreate',
    //   name: 'artistcreate',
    //   component: ArtistCreateView
    // },

    // {
    //   path: '/albumcreate',
    //   name: 'albumcreate',
    //   component: AlbumCreateView
    // },






    // {
    //   path: '/artiscreate',
    //   name: 'artistcreate',
    //   component: ArtistCreateView
    // }
  ]
})

export default router
