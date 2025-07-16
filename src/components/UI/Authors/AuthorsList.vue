<template>
    <div class="card-wrapper">
        <AuthorCard  v-for="author in authors" :key="author.id" :author="author"
        @edit-author="onEdit"
        @delete-author="onDelete"/>
    </div>
</template>

<script setup lang="ts">
import AuthorCard from './AuthorCard.vue';
import type { Author } from '@/types/authorType';
const props = defineProps(['authors']);
const emits = defineEmits(['edit-author', 'delete-author'])
const onEdit = (author: Author) => emits('edit-author', author)
const onDelete = (author: Author) => emits('delete-author', author)
</script>