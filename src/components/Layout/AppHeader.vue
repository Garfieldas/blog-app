<template>
<header class="header">
  <div class="header-left">
  </div>
  <div class="header-right" v-if="store.isLoggedIn">
    <div class="greeting">
      <p>Hi there,</p>
      <strong>{{ store.user.name }}</strong>
    </div>
    <img src="../../assets/icons/avatar.png" alt="user avatar" />
    <button class="nav-button" @click="$emit('showNavBar')">
    <i class="fas fa-bars"></i>
  </button>
  </div>
  <div class="header-right" v-else>
    <div class="greeting">
    </div>
    <button class="nav-button" @click="$emit('showNavBar')">
    <i class="fas fa-bars"></i>
  </button>
  </div>
</header>
</template>
<script setup lang="ts">
import { useAuthenticationStore } from '@/stores/authenticationStore';
const store = useAuthenticationStore();
</script>