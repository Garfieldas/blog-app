<template>
  <main class="main">
    <div class="posts">
      <span class="title">{{ title }}</span>
      <slot name="no-data"> </slot>
      <slot name="buttons"></slot>
      <div class="card-wrapper">
        <slot name="card"> </slot>
      </div>
    </div>
    <slot name="pagination"> </slot>
  </main>
</template>
<script setup lang="ts">
const props = defineProps(["title"]);
</script>
