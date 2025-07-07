import { defineStore } from "pinia";
import type { Notification } from "@/types/notificationType";

export const useNotificationStore = defineStore("notification", {
  state: () => ({
    notifications: <Notification[]>[],
  }),
  actions: {
    AddNotification(notification: Notification) {
      this.notifications.push(notification);
      setTimeout(() => {
        this.notifications.shift();
      }, 2000);
  },
    removeNotification(index: number) {
      this.notifications.splice(index, 1);
    },
  },
});
