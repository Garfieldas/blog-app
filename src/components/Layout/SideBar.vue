<template>
    <section class="sidebar" :class="{'show': showNavBar}">
  <h2 class="logo">
    <i class="fa-solid fa-table-columns"></i> Dashboard
  </h2>
  <nav>
    <ul class="nav-group">

      <li @click="$emit('clicked')">
        <i class="fa-solid fa-envelope"></i> Posts</li>

      <li @click="$emit('clicked')"><i class="fa-regular fa-address-card"></i> Authors</li>

      <li @click="$emit('clicked')"><i class="fa-solid fa-right-to-bracket"></i> Login</li>
      
    </ul>
  </nav>
</section>
</template>

<script setup lang="ts">
const props = defineProps(['showNavBar'])
</script>