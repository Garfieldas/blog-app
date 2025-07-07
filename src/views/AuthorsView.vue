<template>
  <Teleport to=".header-left">
    <SearchBar />
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
const store = useNotificationStore();
const isDisabled = ref(false);
const isFirstLoad = ref(true);

const fetchRequest = async (page: number, perPage: number) => {
  try {
    const fetchedData = await getAllAuthors(page, perPage);
    const fetchedAuthors = fetchedData?.authors || [];
    const total = fetchedData?.totalItems || 0;

    authors.value = fetchedAuthors;
    totalItems.value = total;
    isDisabled.value = false;

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
      message: error.message
    });
  }
};

watch(
  currentPage,
  async (newPage) => {
    const tempData = await getAllAuthors(newPage, itemsPerPage);
    const total = tempData?.totalItems || 0;
    const totalPages = Math.ceil(total / itemsPerPage);

    if (newPage > totalPages && totalPages > 0) {
      currentPage.value = totalPages;
      store.AddNotification({
        type: "error",
        message: "Requested page does not exist",
      });
      return;
    }

    totalItems.value = total;
    await fetchRequest(newPage, itemsPerPage);
  },
  { immediate: true }
);
</script>

<style>
.no-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2em;
}
</style>
