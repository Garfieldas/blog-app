<template>
    <main class="main">
        <div class="posts">
            <span class="title">Authors</span>
            <div v-if="authors.length === 0" class="no-authors">
              <h3>No authors found.</h3>
            </div>
    <div class="card-wrapper">
      <div class="card" v-for="author in authors" :key="author.id">
        <h4>{{ author.name }} {{ author.surname }}</h4>
        <p v-if="toDate(author.created_at ) > toDate(author.updated_at)">
          Created_at: {{ displayDate(author.created_at) }}</p>

        <p v-else-if="toDate(author.created_at) < toDate(author.updated_at)">
          Updated_at:{{ displayDate(author.updated_at) }}</p>
          
        <p v-else>Created_at: {{ displayDate(author.created_at) }}</p>
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
import { getAllAuthors } from '@/composables/authorService';
import { onMounted, ref } from 'vue';
import type { Author } from '@/types/authorType';
import { toDate, displayDate } from '@/composables/dateService';

const authors = ref<Author[]>([]);

onMounted(async () => {
  const fetchedAuthors = await getAllAuthors();
  if (fetchedAuthors){
    authors.value = fetchedAuthors;
  }
})
</script>

<style>
.no-authors {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2em;
}
</style>