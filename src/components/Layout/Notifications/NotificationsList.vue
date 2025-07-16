<template>
    <div class="notification-container">
        <Notification v-for="notification in store.notifications" :notification="notification"
        :key="notification.id" @removeMessage="selectId"/>
    </div>
</template>
<script setup lang="ts">
import Notification from './Notification.vue';
import { useNotificationStore } from '@/stores/notificationStore';
const store = useNotificationStore();
const selectId = (id: string) => {
    store.removeNotification(id);
}
</script>