<template>
    <BaseLayout title="Authors">
        <template v-if="authors.length === 0">
            <h3>No authors found</h3>
            </template>
        <AuthorsList v-else :authors="authors"/>
    </BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from '@/components/UI/BaseLayout.vue';
import AuthorsList from '@/components/UI/Authors/AuthorsList.vue';
import { useAllAuthors } from '@/composables/useAllAuthors';
const authors = useAllAuthors();
</script>
<style scoped>
h3 {
    text-align: center;
    margin-top: 3em;
}
</style>