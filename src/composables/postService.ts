import axios from "axios";
import { baseUrl } from "../../utils/constants";
import { useNotificationStore } from "@/stores/notificationStore";

const api = axios.create({
  baseURL: baseUrl,
});


export const getAllPosts = async () => {
  const store = useNotificationStore();
  try {
    const response = await api.get("/posts?_expand=author");
    const fetchedPosts = response.data;
    if (fetchedPosts) {
      store.AddNotification({
        type: "success",
        message: "Posts fetched from database",
      });
      return fetchedPosts;
    }
  } catch (error: any) {
    const errorMsg = error?.response?.data?.message || "Failed to fetch posts";
    store.AddNotification({
      type: "error",
      message: errorMsg,
    });
  }
};


export const getSinglePost = async (id: number) => {
  const store = useNotificationStore();
  try {
    const response = await api.get(`/posts/${id}?_expand=author`);
    const fetchedPost = response.data;
    if (fetchedPost) {
      store.AddNotification({
        type: 'success',
        message: 'Post fetched from database'
      })
      return fetchedPost;
    }
  }
  catch (error: any){
    const errorMsg = error?.response?.data?.message
     || 'Failed to fetch post';
     store.AddNotification({
      type: 'error',
      message: errorMsg
     })
  }
}