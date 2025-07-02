<template>
  <main class="main">
    <div class="posts">
      <span class="title">Posts</span>
      <div class="card-wrapper">
        <div class="card" v-for="post in posts" :key="post.id">
        <RouterLink :to="{ name: 'postDetails', params: { id: post.id}}">
          <h4>{{ post.title }}</h4>
          <p>Author: {{ post.author.name}} {{ post.author.surname }}</p>

          <p v-if="toDate(post.created_at ) > toDate(post.updated_at)">
            Created_at: {{ displayDate(post.created_at) }}</p>

          <p v-else-if="toDate(post.created_at) < toDate(post.updated_at)">
            Updated_at:{{ displayDate(post.updated_at) }}</p>
          
          <p v-else>Created_at: {{ displayDate(post.created_at) }}</p>
          </RouterLink>
          <div class="buttons">
            <i class="fa-solid fa-eye"></i>
            <i class="fa-solid fa-trash"></i>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import { getAllPosts } from "@/composables/postService";
import type { Post } from "@/types/postType";
import { onMounted, ref } from "vue";
import { toDate, displayDate } from '@/composables/dateService';

const posts = ref<Post[]>([]);

onMounted(async () => {
  const fetchedPosts = await getAllPosts();
  if (fetchedPosts) {
    posts.value = fetchedPosts;
  }
});

</script>