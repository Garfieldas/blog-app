import { getPosts } from "@/services/postService";
import { useNotificationStore } from "@/stores/notificationStore";
import type { Post } from "@/types/postType";
import { ref, computed, watch } from "vue";

export const usePaginatedPosts = () => {
    const posts = ref<Post[]>([]);
    const currentPage = ref(1);
    const totalItems = ref(2);
    const itemsPerPage = 5;
    const isDisabled = ref(false);
    const isFirstLoad = ref(true);
    const query = ref("");
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;
    const store = useNotificationStore();
    const totalPages = computed(() => {
        return Math.ceil(totalItems.value / itemsPerPage);
    })

    const fetchRequest = async () => {
        try {
            const fetchedData = await getPosts(`?_expand=author&_page=${currentPage.value}&_limit=${itemsPerPage}&q=${query.value}`);
            const fetchedPosts = fetchedData.posts;
            const total = fetchedData.totalItems;

            if (fetchedPosts.length === 0 && total > 0 && currentPage.value > 1) {
                currentPage.value = currentPage.value - 1;
                return;
            }
            if (currentPage.value > totalPages.value && totalPages.value - 1) {
                currentPage.value = totalPages.value
                return;
            }
            posts.value = fetchedPosts;
            totalItems.value = total;

            if (posts.value.length === 0 && total === 0) {
                isDisabled.value = true;
                return;
            }
            if (isFirstLoad.value) {
                store.AddNotification({
                    type: "success",
                    message: "Items fetched successfully",
                });
                isFirstLoad.value = false;
            }

        } catch (error: any) {
            posts.value = [];
            totalItems.value = 0;
            isDisabled.value = false;

            store.AddNotification({
                type: "error",
                message: error
            });
        }

    }
    watch(
        currentPage,
        () => {
            fetchRequest();
        },
        { immediate: true }
    );
    watch(query, () => {
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }
        debounceTimer = setTimeout(() => {
            currentPage.value = 1;
            fetchRequest();
        }, 300);
    });

    return {
        posts,
        currentPage,
        totalItems,
        itemsPerPage,
        isDisabled,
        totalPages,
        query,
        fetchRequest
    }

}