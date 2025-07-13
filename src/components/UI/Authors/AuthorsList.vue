<template>
    <div class="card-wrapper">
        <AuthorCard  v-for="author in authors" :key="author.id"/>
    </div>
</template>

<script setup lang="ts">
import AuthorCard from './AuthorCard.vue';
const props = defineProps(['authors']);
</script>