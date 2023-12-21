import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArtistView from '../views/ArtistView.vue'
import AlbumView from '../views/AlbumView.vue'
import TrackView from '../views/TrackView.vue'
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
      path: '/artist',
      name: 'artist',
      component: ArtistView
    },

    {
      path: '/album',
      name: 'album',
      component: AlbumView
    },

    {
      path: '/track',
      name: 'track',
      component: TrackView
    },

    {
      path: '/artistcreate',
      name: 'artistcreate',
      component: ArtistCreateView
    },

    {
      path: '/albumcreate',
      name: 'albumcreate',
      component: AlbumCreateView
    },






    // {
    //   path: '/artiscreate',
    //   name: 'artistcreate',
    //   component: ArtistCreateView
    // }
  ]
})

export default router
