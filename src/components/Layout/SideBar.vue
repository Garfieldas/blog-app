<template>
    <section class="sidebar" :class="{'show': showNavBar}">
  <h2 class="logo">
    <i class="fa-solid fa-table-columns"></i> Dashboard
  </h2>
  <nav>
    <ul class="nav-group">

      <router-link :to="{ name: 'posts'}">
      <li @click="$emit('clicked')">
        <i class="fa-solid fa-envelope"></i> Posts</li>
      </router-link>

      <router-link :to="{ name: 'authors'}">
      <li @click="$emit('clicked')"><i class="fa-regular fa-address-card"></i> Authors</li>
      </router-link>

      <router-link :to="{name: 'login'}">
      <li @click="$emit('clicked')"><i class="fa-solid fa-right-to-bracket"></i> Login</li>
      </router-link>
      
    </ul>
  </nav>
</section>
</template>

<script setup lang="ts">
const props = defineProps(['showNavBar'])
</script>

<style>
a {
  text-decoration: none;
  color: inherit;
}
</style>
