import { getPosts } from "@/services/postService";
import { useAuthenticationStore } from "@/stores/authenticationStore";
import { useNotificationStore } from "@/stores/notificationStore";
import type { Post } from "@/types/postType";
import { ref } from "vue";
import { useRouter } from "vue-router";

export const useSignlePost = () => {
  const post = ref<Post | null>(null);
  const router = useRouter();
  const goBack = () => router.go(-1);
  const store = useNotificationStore();
  const auth = useAuthenticationStore();
  const isFirstLoad = ref(false);

  const fetchPost = async (id: number) => {
    try {
      const fetchedData = await getPosts(`/${id}?_expand=author`);
      post.value = fetchedData?.posts;
      if (isFirstLoad.value === false) {
        store.AddNotification({
          type: "success",
          message: "Post fetched successfully",
        });
      }
      isFirstLoad.value = true;
    } catch (error: any) {
      router.push({ name: "postNotFound" });
      store.AddNotification({
        type: "error",
        message: error,
      });
    }
  };
  return {
    post,
    goBack,
    fetchPost,
    router,
  }
};
