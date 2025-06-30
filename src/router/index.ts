import PostsView from '@/views/PostsView.vue';
import AuthorsView from '@/views/AuthorsView.vue';
import PostDetails from '@/views/PostDetails.vue';
import LoginView from '@/views/LoginView.vue';
import Error404 from '@/views/Error404.vue';
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'posts',
      component: PostsView,
      alias: '/posts'
    },
    {
      path: '/authors',
      name: 'authors',
      component: AuthorsView
    },
    {
    path: '/post-details/:id',
    name: 'postDetails',
    component: PostDetails,
    props: true
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/:pathMatch(.*)',
      name: 'NotFound',
      component: Error404
    }
  ],
})

export default router
