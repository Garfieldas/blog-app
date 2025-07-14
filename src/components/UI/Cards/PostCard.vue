<template>
  <div class="card">
    <RouterLink :to="{ name: 'postDetails', params: { id: post.id } }">
      <h4>{{ post.title }}</h4>
      <p>Author: {{ post.author.name }} {{ post.author.surname }}</p>
      <p v-if="toDate(post.created_at) > toDate(post.updated_at)">
        Created_at: {{ displayDate(post.created_at) }}</p>

      <p v-else-if="toDate(post.created_at) < toDate(post.updated_at)">
        Updated_at:{{ displayDate(post.updated_at) }}</p>

      <p v-else>Created_at: {{ displayDate(post.created_at) }}</p>

    </RouterLink>
    <div class="buttons" v-if="store.isLoggedIn">
      <i class="fa-solid fa-pen-to-square" @click="emit('edit-post', post)"></i>
      <i class="fa-solid fa-trash" @click="emit('delete-post', post)"></i>
    </div>
  </div>
</template>
<script setup lang="ts">
import { toDate, displayDate  } from '../../../../utils/dateService';
import { useAuthenticationStore } from '@/stores/authenticationStore';
const props = defineProps(['post']);
const store = useAuthenticationStore();
const emit = defineEmits(['edit-post', 'delete-post']);
</script>
