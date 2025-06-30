import { defineStore } from "pinia";
import type { Notification } from "@/types/notificationType";
import { v4 as uuidv4 } from 'uuid';

export const useNotificationStore = defineStore("notification", {
  state: () => ({
    notifications: <Notification[]>[],
  }),
  actions: {
    AddNotification(notification: Notification) {
      notification = {...notification, id: uuidv4()}
      const itemId = notification.id;
      this.notifications.push(notification);
      setTimeout(() => {
        this.notifications = this.notifications.filter((item) => itemId !== item.id)
      }, 3000);
    },
    removeNotification(index: number) {
      this.notifications.splice(index, 1);
    },
  },
});
