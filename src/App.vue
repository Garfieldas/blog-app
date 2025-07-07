<template>
<NavBar :showNavBar="showNav" @clicked="closeNavBar"/>
<AppHeader @showNavBar="showNavBar"/>
<Overlay :showOverlay="showOverlay" @click="closeNavBar"/>
<Notification />
<RouterView />
</template>

<script setup lang="ts">
import NavBar from './components/Layout/NavBar.vue';
import AppHeader from './components/Layout/AppHeader.vue';
import Overlay from './components/Layout/Overlay.vue';
import Notification from './components/Layout/Notification.vue';
import { ref } from 'vue';

const showNav = ref(false);
const showOverlay = ref(false);

const showNavBar = () => {
    showNav.value  = true;
    showOverlay.value = true;
}

const closeNavBar = () => {
    showNav.value = false;
    showOverlay.value = false;
}
</script>