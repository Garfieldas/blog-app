<template>
    <div class="card">
        <h4>{{ displayFullName(author.name, author.surname) }}</h4>
    <p>
      {{ displayDate(author.created_at, author.updated_at).label }}:
      {{ displayDate(author.created_at, author.updated_at).date }}
    </p>
        <div class="buttons">
        <i class="fa-solid fa-pen-to-square"></i>
        <i class="fa-solid fa-trash"></i>
        </div>
    </div>
</template>

<script setup lang="ts">
import { displayDate } from '@/composables/formatDate';
import { displayFullName } from '@/composables/displayFullName';
const props = defineProps(['author'])
</script>