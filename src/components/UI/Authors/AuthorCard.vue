<template>
    <div class="card">
        <h4>{{ author.name author.surname }}</h4>
        <p>Created_at{{ author.created_at }}</p>
        <div class="buttons">
        <i class="fa-solid fa-pen-to-square"></i>
        <i class="fa-solid fa-trash"></i>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps(['author'])
</script>