<template>
    <div class="card-wrapper">
        <PostCard  v-for="post in posts" :key="post.id" :post="post"
        @edit-post="onEdit"
        @delete-post="onDelete"/>
    </div>
</template>

<script setup lang="ts">
import PostCard from './PostCard.vue';
import type { Post } from '@/types/postType';
const props = defineProps(['posts']);
const emits = defineEmits(['edit-post', 'delete-post'])
const onEdit = (post: Post) => emits('edit-post', post)
const onDelete = (post: Post) => emits('delete-post', post)
</script>