<template>
  <SideBar :showNavBar="showNav" @clicked="closeNavBar" />
  <AppHeader @showNavBar="showNavBar" />
  <Overlay :showOverlay="showOverlay" @click="closeNavBar" />
  <NotificationsList />
</template>

<script setup lang="ts">
import SideBar from "./components/Layout/SideBar.vue";
import AppHeader from "./components/Layout/AppHeader.vue";
import Overlay from "./components/UI/Overlay.vue";
import NotificationsList from "./components/Layout/Notifications/NotificationsList.vue";
import { ref } from "vue";

const showNav = ref(false);
const showOverlay = ref(false);

const showNavBar = () => {
  showNav.value = true;
  showOverlay.value = true;
};

const closeNavBar = () => {
  showNav.value = false;
  showOverlay.value = false;
};
</script>