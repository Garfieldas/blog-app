import { defineStore } from "pinia";
import { ref } from "vue";
import type { Notification } from "../types/notificationType";
import { v4 as uuidv4 } from 'uuid';

export const useNotificationStore = defineStore('notification',
    () => {
        const notifications = ref<Notification[]>([]);
        function addNotification(notification: Notification) {
            const id = uuidv4();
            notification = {...notification, id}
            notifications.value.push(notification);
            setTimeout(() => {
                notifications.value = notifications.value.filter((item) => item.id !== id);
            }, 5000)
        }
        function removeNotification(id: string) {
            notifications.value = notifications.value.filter((item) => item.id !== id);
        }
        return { notifications, addNotification, removeNotification}
    }
)