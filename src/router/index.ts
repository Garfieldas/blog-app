import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      children: [
        {
          path: "",
          name: "posts",
          component: () => import("@/views/PostsView.vue"),
          alias: "/posts",
        },
        {
          path: "posts/:id",
          name: "postDetails",
          component: () => import("@/views/PostDetails.vue"),
          props: true,
        },
      ],
    },
    {
      path: "/authors",
      name: "authors",
      component: () => import("@/views/AuthorsView.vue")
    },
    {
      path: '/login',
      name: 'login',
      component: () => import("@/views/LoginView.vue")
    },
    {
      path: "/:pathMatch(.*)",
      name: "NotFound",
      component: () => import("@/views/ErrorView.vue"),
    },
  ],
});

export default router;
