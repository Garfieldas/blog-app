<template>
  <Teleport to=".header-left">
    <SearchBar v-model:query="query" v-model:is-disabled="isDisabled" />
  </Teleport>
  <PageLayout title="Authors">
    <template v-slot:no-data>
      <div v-if="authors.length === 0" class="no-data">
        <h3>No authors found.</h3>
      </div>
    </template>
    <template v-slot:card>
      <AuthorCard v-for="author in authors" :key="author.id" :author="author" />
    </template>
    <template v-slot:pagination>
      <Pagination v-model:currentPage="currentPage" v-model:totalItems="totalItems" :itemsPerPage="itemsPerPage"
        v-model:isDisabled="isDisabled" />
    </template>
  </PageLayout>
</template>

<script setup lang="ts">
import { getAllAuthors } from "@/composables/authorService";
import { ref, watch } from "vue";
import type { Author } from "@/types/authorType";
import Pagination from "@/components/UI/Pagination.vue";
import AuthorCard from "@/components/UI/Cards/AuthorCard.vue";
import PageLayout from "@/components/UI/PageLayout.vue";
import SearchBar from "@/components/UI/SearchBar.vue";
import { useNotificationStore } from "@/stores/notificationStore";

const authors = ref<Author[]>([]);
const currentPage = ref(1);
const totalItems = ref(2);
const itemsPerPage = 2;
const isDisabled = ref(false);
const isFirstLoad = ref(true);
const query = ref('');
const store = useNotificationStore();
let debounceTimer: ReturnType<typeof setTimeout> | null = null;

const fetchRequest = async (page: number, perPage: number, query: string) => {
  try {
    const fetchedData = await getAllAuthors(page, perPage, query);
    const fetchedAuthors = fetchedData?.authors;
    const total = fetchedData?.totalItems;
    const toalPages = Math.ceil(total / itemsPerPage);

    if (page > toalPages && toalPages > 0) {
      currentPage.value = toalPages;
      store.AddNotification({
        type: "error",
        message: "Requested page does not exist",
      });
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

<style>
.no-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2em;
}
</style>
