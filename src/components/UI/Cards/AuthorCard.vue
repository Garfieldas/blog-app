<template>
  <div class="card">
    <h4>{{ author.name }} {{ author.surname }}</h4>
    <p v-if="toDate(author.created_at) > toDate(author.updated_at)">
      Created_at: {{ displayDate(author.created_at) }}</p>

    <p v-else-if="toDate(author.created_at) < toDate(author.updated_at)">
      Updated_at:{{ displayDate(author.updated_at) }}</p>

    <p v-else>Created_at: {{ displayDate(author.created_at) }}</p>

    <div class="buttons" v-if="store.isLoggedIn">
      <i class="fa-solid fa-eye" @click="emit('edit-author', author)"></i>
      <i class="fa-solid fa-trash"></i>
    </div>
  </div>
</template>
<script setup lang="ts">
import { toDate, displayDate  } from '../../../../utils/dateService';
import { useAuthenticationStore } from '@/stores/authenticationStore';
const props = defineProps(['author']);
const store = useAuthenticationStore();
const emit = defineEmits(['edit-author']);
</script>