<template>
<header class="header">
  <div class="header-left">
    <div class="search">
      <img src="../../assets/icons/search.svg" alt="search" />
      <input type="text" name="search" id="search" />
    </div>
  </div>
  <div class="header-right">
    <div class="greeting">
      <p>Hi there,</p>
      <strong>John Doe</strong>
    </div>
    <img src="../../assets/icons/avatar.png" alt="user avatar" />
    <button class="nav-button" @click="$emit('showNavBar')">
    <i class="fas fa-bars"></i>
  </button>
  </div>
</header>
</template>