import { defineStore } from "pinia";
import type { Notification } from "@/types/notificationType";
import { ref } from "vue";
import { v4 as uuidv4 } from 'uuid';

export const useNotificationStore = defineStore('notifications', () => {

  const notifications = ref<Notification[]>([]);

  const AddNotification = (notification: Notification) => {
    const id = uuidv4();
    notification = {...notification, id}
    notifications.value.push(notification);
    setTimeout(() => {
      notifications.value = notifications.value.filter((item) => item.id !== id)
    }, 5000)
  }
  const removeNotification = (id: string) => {
    notifications.value = notifications.value.filter((item) => item.id !== id)
  }
  return { notifications, AddNotification, removeNotification}
})

