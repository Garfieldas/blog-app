<template>
  <select id="authorId" required  :class="$attrs.class" v-model="selectedAuthor">
    <option :value="author.id" v-for="author in authors" :key="author.id">{{ displayName(author.name, author.surname) }}</option>
  </select>
</template>

<script setup lang="ts">
import { getUnPaginatedAuthors } from '@/composables/authorService';
import type { Author } from '@/types/authorType';
import { onMounted, ref, watch } from 'vue';
import { useNotificationStore } from '@/stores/notificationStore';

const authors = ref<Author[]>([]);
const selectedAuthor = defineModel('selectedAuthor');

const fetchRequest = async () => {
const store = useNotificationStore();
  const response = await getUnPaginatedAuthors();
  const status = response.status;
  if (status){
    authors.value = response.authors;
  }
  else {
    store.AddNotification({
      type: 'error',
      message: 'Failed to load author list'
    })
  }
}

const displayName = (name: string, surname: string) => `${name} ${surname}`
onMounted(() => {
  fetchRequest();
})
</script>
