<template>
  <BaseModal v-model:toggle-modal="toggleModal" @modal-closed="toggleModal = false">
    <slot>
      <component :is="currentForm"
      @submit-form="handleSubmit"
      :author="selectedAuthor" />
    </slot>
  </BaseModal>
  <Teleport to=".header-left">
    <SearchBar v-model:query="query" v-model:is-disabled="isDisabled" />
  </Teleport>
  <PageLayout title="Authors">
    <template v-slot:no-data>
      <div v-if="authors.length === 0" class="no-data">
        <h3>No authors found.</h3>
      </div>
    </template>
    <template v-slot:buttons>
      <div class="post-actions" v-if="auth.isLoggedIn">
        <a class="button" @click="switchComponent(CreateAuthorForm)">Create new Author</a>
      </div>
    </template>
    <template v-slot:card>
      <AuthorCard v-for="author in authors" :key="author.id" :author="author"
      @edit-author="switchComponent(EditAuthorForm); selectAuthor(author)"/>
    </template>
    <template v-slot:pagination>
      <Pagination
        v-model:currentPage="currentPage"
        v-model:totalItems="totalItems"
        :itemsPerPage="itemsPerPage"
        v-model:isDisabled="isDisabled"
      />
    </template>
  </PageLayout>
</template>

<script setup lang="ts">
import { getAllAuthors } from "@/composables/authorService";
import { ref, shallowRef, watch } from "vue";
import type { Author } from "@/types/authorType";
import Pagination from "@/components/UI/Pagination.vue";
import AuthorCard from "@/components/UI/Cards/AuthorCard.vue";
import PageLayout from "@/components/UI/PageLayout.vue";
import SearchBar from "@/components/UI/SearchBar.vue";
import { useNotificationStore } from "@/stores/notificationStore";
import { useAuthenticationStore } from "@/stores/authenticationStore";
import BaseModal from "@/components/UI/BaseModal.vue";
import CreateAuthorForm from "@/components/UI/Forms/Authors/CreateAuthorForm.vue";
import EditAuthorForm from "@/components/UI/Forms/Authors/EditAuthorForm.vue";

const authors = ref<Author[]>([]);
const currentPage = ref(1);
const totalItems = ref(2);
const itemsPerPage = 5;
const isDisabled = ref(false);
const isFirstLoad = ref(true);
const query = ref("");
const store = useNotificationStore();
const auth = useAuthenticationStore();
let debounceTimer: ReturnType<typeof setTimeout> | null = null;
const currentForm = shallowRef(CreateAuthorForm);
const toggleModal = ref(false);
const selectedAuthor = ref();

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
      message: "Network error",
    });
  }
};

const switchComponent = (component: any) => {
  currentForm.value = component;
  toggleModal.value = true
}

const selectAuthor = (author: Author) => {
  selectedAuthor.value = author
}

const handleSubmit = (isSuccess: boolean) => {
  if (isSuccess){
    fetchRequest(currentPage.value, itemsPerPage, query.value);
  }
  toggleModal.value = false
}

watch(
  currentPage,
  async (newPage) => {
    await fetchRequest(newPage, itemsPerPage, query.value);
  },
  { immediate: true }
);

watch(query, (newValue) => {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
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

.post-actions {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  font-size: 0.7rem;
  margin-bottom: 2em;
}

.button {
  margin-top: auto;
  background-color: var(--blue);
  text-align: center;
  border-radius: 999px;
  border: none;
  min-width: 200px;
  padding: 15px;
  padding: 1em 5em;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s, transform 0.1s;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  color: var(--white);
}

.button:hover {
  background-color: var(--border);
}
.disabled {
  pointer-events: none;
  opacity: 0.5;
}

@media (max-width: 600px) {
  .post-actions {
    justify-content: center;
  }
}
</style>

