<template>
  <div class="notification-container">
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
.notification-container {
  position: fixed;
  top: 5%;
  left: 20%;
  right: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
  z-index: 1050;
  display: flex;
  gap: 2rem;
  flex-direction: column;
  animation: fadeIn 0.4s ease-in-out;
}

.notification {
  display: block;
  position: relative;
  border: 1px solid #badbcc;
  border-radius: 5px;
  padding: 1rem 1.5rem;
  font-size: 0.95rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.4s ease-in-out;
  width: 100%;
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

.notification p {
  margin: 0;
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

</style>
