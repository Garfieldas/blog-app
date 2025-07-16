<template>
  <select id="authorId" required  :class="$attrs.class" v-model="selectedAuthor">
    <option :value="author.id" v-for="author in authors" :key="author.id">{{ displayName(author.name, author.surname) }}</option>
  </select>
</template>

<script setup lang="ts">
import { getAuthors } from '@/services/authorService';
import type { Author } from '@/types/authorType';
import { onMounted, ref } from 'vue';
import { useNotificationStore } from '@/stores/notificationStore';

const authors = ref<Author[]>([]);
const selectedAuthor = defineModel('selectedAuthor');

const fetchRequest = async () => {
  const store = useNotificationStore();
  try {
  const response = await getAuthors()
  authors.value = response.authors
  }
  catch(error: any){
    store.AddNotification({
      type: 'error',
      message: error
    })
  }
}

const displayName = (name: string, surname: string) => `${name} ${surname}`
onMounted(() => {
  fetchRequest();
})
</script>
