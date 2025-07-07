<template>
  <Teleport to=".header-left">
    <SearchBar v-model:query="query" v-model:is-disabled="isDisabled" />
  </Teleport>

  <PageLayout title="Posts">
    <template v-slot:no-data>
      <div v-if="posts.length === 0" class="no-data">
        <h3>No posts found.</h3>
      </div>
    </template>

    <template v-slot:card>
      <PostCard v-for="post in posts" :key="post.id" :post="post" />
    </template>

    <template v-slot:pagination>
      <Pagination v-model:currentPage="currentPage" v-model:totalItems="totalItems" :itemsPerPage="itemsPerPage"
        v-model:isDisabled="isDisabled" />
    </template>
  </PageLayout>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { getAllPosts } from "@/composables/postService";
import type { Post } from "@/types/postType";
import Pagination from "@/components/UI/Pagination.vue";
import PostCard from "@/components/UI/Cards/PostCard.vue";
import PageLayout from "@/components/UI/PageLayout.vue";
import SearchBar from "@/components/UI/SearchBar.vue";
import { useNotificationStore } from "@/stores/notificationStore";

const posts = ref<Post[]>([]);
const currentPage = ref(1);
const itemsPerPage = 2;
const totalItems = ref(0);
const isDisabled = ref(false);
const isFirstLoad = ref(true);
const query = ref('');
const store = useNotificationStore();
let debounceTimer: ReturnType<typeof setTimeout> | null = null;

const fetchRequest = async (page: number, perPage: number, query: string) => {
  try {
    const fetchedData = await getAllPosts(page, perPage, query);
    const fetchedPosts = fetchedData?.posts;
    const total = fetchedData?.totalItems;
    const totalPages = Math.ceil(total / itemsPerPage)

    if (page > totalPages && totalPages > 0) {
      currentPage.value = totalPages;
      store.AddNotification({
        type: 'error',
        message: 'Requated page does not exist'
      })
      return;
    }

    posts.value = fetchedPosts;
    totalItems.value = total;

    if (fetchedPosts.length === 0 && total === 0) {
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
      message: 'Network error'
    });
  }
};

watch(
  currentPage,
  async (newPage) => {
    await fetchRequest(newPage, itemsPerPage, query.value);
  },
  { immediate: true }
);

watch(query, (newValue) => {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }
  debounceTimer = setTimeout(() => {
    currentPage.value = 1;
    fetchRequest(currentPage.value, itemsPerPage, newValue);
  }, 300);
});
</script>