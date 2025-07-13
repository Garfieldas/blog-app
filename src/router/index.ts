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
          component: () => "@/views/PostsView.vue",
          alias: "/posts",
        },
        {
          path: "posts/:id",
          name: "postDetails",
          component: () => "@/views/PostDetails.vue",
          props: true,
        },
      ],
    },
    {
      path: "/authors",
      name: "authors",
      component: () => "@/views/AuthorsView.vue",
    },
    {
      path: "/:pathMatch(.*)",
      name: "NotFound",
      component: () => "@/views/ErrorView.vue",
    },
  ],
});

export default router;
