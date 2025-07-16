import { getAuthors } from "@/services/authorService";
import { useNotificationStore } from "@/stores/notificationStore";
import type { Author } from "@/types/authorType";
import { ref, computed, watch } from "vue";

export const usePaginatedAuthors = () => {
    const authors = ref<Author[]>([]);
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
            const fetchedData = await getAuthors(`?_page=${currentPage.value}&_limit=${itemsPerPage}&q=${query.value}`);
            const fetchedAuthors = fetchedData.authors;
            const total = fetchedData.totalItems;

            if (fetchedAuthors.length === 0 && total > 0 && currentPage.value > 1) {
                currentPage.value = currentPage.value - 1;
                return;
            }
            if (currentPage.value > totalPages.value && totalPages.value - 1) {
                currentPage.value = totalPages.value
                return;
            }
            authors.value = fetchedAuthors;
            totalItems.value = total;

            if (authors.value.length === 0 && total === 0) {
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
            authors.value = [];
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
        authors,
        currentPage,
        totalItems,
        itemsPerPage,
        isDisabled,
        totalPages,
        query,
        fetchRequest
    }

}