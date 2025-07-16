<template>
  <div class="card">
    <RouterLink :to="{ name: 'postDetails', params: { id: post.id } }">
      <h4>{{ post.title }}</h4>
      <p>Author: {{ post.author.name }} {{ post.author.surname }}</p>
      <p>
          {{ displayDate(post.created_at, post.updated_at).label }}:
        {{ displayDate(post.created_at, post.updated_at).date }}
      </p>

    </RouterLink>
    <div class="buttons" v-if="store.isLoggedIn">
      <i class="fa-solid fa-pen-to-square" @click="emit('edit-post', post)"></i>
      <i class="fa-solid fa-trash" @click="emit('delete-post', post)"></i>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAuthenticationStore } from '@/stores/authenticationStore';
import { displayDate } from '@/utils/formatDate';
const props = defineProps(['post']);
const store = useAuthenticationStore();
const emit = defineEmits(['edit-post', 'delete-post']);
</script>
