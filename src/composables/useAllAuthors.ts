import { ref, onMounted } from "vue";
import { getAllAuthors } from "@/components/services/authorService";
import { useNotificationStore } from "@/stores/notificationsStore";

export const useAllAuthors = () => {
  const authors = ref([]);
  const store = useNotificationStore();

  const fetchrequest = async () => {
    try {
      const response = await getAllAuthors();
      const data = response;
      authors.value = data;
      store.addNotification({
        type: "success",
        message: "Authors fetched successfully",
      });

    } catch (error: any) {
      store.addNotification({
        type: "error",
        message: error,
      });

    }
  };

  onMounted(() => {
    fetchrequest();
  });

  return authors;
};
