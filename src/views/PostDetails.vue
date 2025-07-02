<template>
     <main class="main" v-if="post">
      <div class="title-container">
      <h1 class="post-title">{{ post.title }}</h1>
      </div>
      <article class="post-content">
        <p>{{ post?.body }}</p>
      </article>
      <div class="post-bottom">
      <div class="post-actions">
        <a class="button" @click="goBack">Back</a>
        <a class="button delete"> Delete</a>
      </div>
      <div class="post-meta">
        <p><strong>Author</strong>: {{ post.author.name }} {{ post.author.surname }}</p>
          <p v-if="toDate(post.created_at ) > toDate(post.updated_at)">
            Created_at: {{ displayDate(post.created_at) }}</p>

          <p v-else-if="toDate(post.created_at) < toDate(post.updated_at)">
            Updated_at:{{ displayDate(post.updated_at) }}</p>
          
          <p v-else>Created_at: {{ displayDate(post.created_at) }}</p>

      </div>
    </div>
    </main>
    <p v-else>
      Loading...
    </p>
</template>
<script setup lang="ts">
import { getSinglePost } from '@/composables/postService';
import { onMounted, ref, watch } from 'vue';
import type { Post } from '@/types/postType';
import { useRouter } from 'vue-router';
import { toDate, displayDate } from '@/composables/dateService';


const props = defineProps(['id']);
const post = ref<Post | null>(null);
const router = useRouter();
const goBack = () => router.go(-1);

const fetchPost = async (id: number) => {
  
  const fetchedPost = await getSinglePost(id);
  if (fetchedPost) {
    post.value = fetchedPost;
  }
  else {
    router.push({name: 'postNotFound'})
  }
}

onMounted(async () => {
  fetchPost(props.id)
})


watch(() => props.id, (newId) => {
  fetchPost(newId)
})

</script>

<style scoped>
.main {
  background-color: var(--gray);
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  color: black;
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

.posts {
  text-align: left;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
}

.title-container {
  display: flex;
  justify-content: center;
}

.post-title {
  text-align: center;
  margin-bottom: 1rem;
}

.post-title::after {
  content: '';
  display: block;
  width: 170px;
  border-bottom: 2px solid var(--border);
}

.post-content {
  display: flex;
  font-size: 1rem;
  line-height: 1.2rem;
  margin-top: 2rem;
}

.post-bottom {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
}

.post-meta {
  display: flex;
  align-items:  flex-end;
  flex-direction: column;
  gap: 0.2rem;
}

.post-actions {
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  font-size: 0.7rem;
}

.button {
  margin-top: auto;
  background-color: var(--blue);
  text-align: center;
  min-width: 50px;
  padding: 10px 15px;
  border-radius: 999px;
  border: none;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s, transform 0.1s;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  color: var(--white);
}

.delete {
  background-color: var(--red);
}

.button:hover {
  background-color: var(--border);
}

@media (max-width: 925px) {

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 220px;
    height: 100vh;
    z-index: 1000;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  .sidebar.show {
    transform: translateX(0);
  }

  .sidebar.hidden {
    transform: translateX(-100%);
  }

  .header {
    grid-column: 1 / 3;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    position: fixed;
    padding: 1rem;
    width: 100%;
  }

  .header-right img {
    display: none;
  }

  .nav-button {
    display: block;
  }

  #search {
    width: clamp(175px, 50%, 300px)
  }

  .header-left {
    margin: 0 auto;
    text-align: center;
  }
  .main {
    grid-column: 1 / 3;
  }
}

@media (max-width: 600px) {
  .button {
    font-size: 14px;
    padding: 8px 12px;
  }
}
</style>