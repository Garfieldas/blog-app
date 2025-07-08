import PostsView from '@/views/PostsView.vue';
import AuthorsView from '@/views/AuthorsView.vue';
import PostDetails from '@/views/PostDetails.vue';
import LoginView from '@/views/LoginView.vue';
import Error404 from '@/views/Error404.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthenticationStore } from '@/stores/authenticationStore';
import { useNotificationStore } from '@/stores/notificationStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      children: [
        {
          path: "",
          name: "posts",
          component: PostsView,
          alias: "/posts"
        },
        {
          path: 'posts/:id',
          name: 'postDetails',
          component: PostDetails,
          props: true,
        },
        {
          path: '/posts/not-found',
          name: 'postNotFound',
          component: Error404
        },
      ]
    },
    {
      path: '/authors',
      name: 'authors',
      component: AuthorsView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,

      beforeEnter: (to, from, next) => {
        const store = useAuthenticationStore();
        if (store.isLoggedIn) {
          next({name: 'posts'})
        }
        else {
          next();
        }
      }
    },
    {
      path: '/:pathMatch(.*)',
      name: 'NotFound',
      component: Error404
    }
  ],
})

export default router
