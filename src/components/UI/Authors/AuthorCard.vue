<template>
  <div class="card">
    <h4>{{ author.name }} {{ author.surname }}</h4>
    <p>
        {{ displayDate(author.created_at, author.updated_at).label }}:
        {{ displayDate(author.created_at, author.updated_at).date }}
    </p>

    <div class="buttons" v-if="store.isLoggedIn">
      <i class="fa-solid fa-pen-to-square" @click="emit('edit-author', author)"></i>
      <i class="fa-solid fa-trash" @click="emit('delete-author', author)"></i>
    </div>
  </div>
</template>
<script setup lang="ts">
import { displayDate } from '@/utils/formatDate';
import { useAuthenticationStore } from '@/stores/authenticationStore';
const props = defineProps(['author']);
const store = useAuthenticationStore();
const emit = defineEmits(['edit-author', 'delete-author']);
</script>