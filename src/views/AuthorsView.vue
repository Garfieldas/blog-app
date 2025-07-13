<template>
    <BaseLayout title="Authors">
        <AuthorsList :authors="authors"/>
    </BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from '@/components/UI/BaseLayout.vue';
import AuthorsList from '@/components/UI/Authors/AuthorsList.vue';
import { useAllAuthors } from '@/composables/useAllAuthors';
const authors = useAllAuthors();
</script>