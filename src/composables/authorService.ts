import axios from "axios";
import { baseUrl } from "../../utils/constants";
import { useNotificationStore } from "@/stores/notificationStore";

const api = axios.create({
  baseURL: baseUrl,
});

export const getAllAuthors = async () => {
  const store = useNotificationStore();
  try {
    const response = await api.get("/authors");
    const fetchedAuthors = response.data;
    if(fetchedAuthors){
    store.AddNotification({
      type: "success",
      message: "Authors fetched from database",
    });
    return fetchedAuthors;
  }
  } catch (error: any) {
    const errorMsg =
      error?.response?.data?.message || "Failed to fetch authors.";
    store.AddNotification({
      type: "error",
      message: errorMsg,
    });
  }
};
