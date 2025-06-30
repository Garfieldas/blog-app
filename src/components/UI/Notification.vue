<template>
  <div class="notifications-container">
    <div
      v-for="(notification, index) in notifications"
      :key="index"
      class="notification"
      :class="['notification', notification.type]"
    >
      <p>
        <strong>{{ notification.type }}</strong> {{ notification.message }}
      </p>
      <span class="close-btn" @click="removeMessage(index)"
        ><i class="fa-solid fa-circle-xmark"></i
      ></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNotificationStore } from "@/stores/notificationStore";
const notificationStore = useNotificationStore();
const notifications = notificationStore.notifications;

const removeMessage = (id: number) => {
  notificationStore.removeNotification(id);
};
</script>

<style>
.notifications-container {
  position: fixed;
  top: 130px;
  left: 300px;
  right: 20px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 1050;
}

.notification {
  position: relative;
  padding: 1.7rem 1.5rem;
  border-radius: 5px;
  font-size: 0.95rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid transparent;
  animation: fadeIn 0.4s ease-in-out;
}

.notification.success {
  background-color: #d1e7dd;
  color: #0f5132;
  border-color: #badbcc;
}

.notification.error {
  background-color: #f8d7da;
  color: #842029;
  border-color: #f5c2c7;
}

.notification .close-btn {
  position: absolute;
  top: 8px;
  right: 12px;
  font-size: 1.2rem;
  cursor: pointer;
  color: inherit;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 925px) {
  .notifications-container {
    left: 20px;
    right: 20px;
  }
}
</style>
