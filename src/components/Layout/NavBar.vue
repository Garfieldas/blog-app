<template>
    <section class="sidebar" :class="{'show': showNavBar}">
  <h2 class="logo">
    <i class="fa-solid fa-table-columns"></i> Dashboard
  </h2>
  <nav>
    <ul class="nav-group">

      <Router-link :to="{ name: 'posts'}">
      <li @click="$emit('clicked')">
        <i class="fa-solid fa-envelope"></i> Posts</li>
      </Router-link>

      <Router-link :to="{ name: 'authors'}">
      <li @click="$emit('clicked')"><i class="fa-regular fa-address-card"></i> Authors</li>
      </Router-link>

      <Router-link :to="{ name: 'login'}" v-if="!store.isLoggedIn">
      <li @click="$emit('clicked')"><i class="fa-solid fa-right-to-bracket"></i> Login</li>
      </Router-link>
      <li @click="$emit('clicked'); logout()" v-else><i class="fa-solid fa-right-to-bracket"></i> Logout</li>
    </ul>
  </nav>
</section>
</template>

<script setup lang="ts">
import { useAuthenticationStore } from '@/stores/authenticationStore';
import { useNotificationStore } from '@/stores/notificationStore';
import { useRouter } from 'vue-router';
const props = defineProps(['showNavBar'])
const store = useAuthenticationStore();
const notify = useNotificationStore();
const router = useRouter();

const logout = () => {
  store.Logout();
  notify.AddNotification({
    type: 'success',
    message: 'You succesfully logged out'
  })
  router.replace({name: 'login'})
}
</script>

<style>
a {
  text-decoration: none;
  color: inherit;
}
</style>