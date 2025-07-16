<template>
  <main class="main">
    <div class="posts">
      <span class="title">{{ title }}</span>
      <slot></slot>
    </div>
  </main>
</template>

<script setup lang="ts">
const props = defineProps(['title'])
</script>