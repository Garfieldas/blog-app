<template>
  <BaseModal
    v-model:toggle-modal="toggleModal"
    @modal-closed="toggleModal = false"
  >
    <slot>
      <component
        :is="currentForm"
        :author="selectedAuthor"
        @submit-form="handleSubmit"
      />
    </slot>
  </BaseModal>
  <Teleport to=".header-left">
    <SearchBar v-model:query="query" v-model:is-disabled="isDisabled" />
  </Teleport>
  <PageLayout title="Authors">
    <div v-if="authors.length === 0" class="no-data">
      <h3>No authors found.</h3>
    </div>
    <div class="post-actions" v-if="auth.isLoggedIn">
      <a class="button" @click="switchComponent(CreateAuthorForm)"
        >Create new Author</a
      >
    </div>
    <AuthorsList
      :authors="authors"
      @edit-author="
        (author) => {
          selectAuthor(author);
          switchComponent(EditAuthorForm);
        }
      "
      @delete-author="
        (author) => {
          selectAuthor(author);
          switchComponent(DeleteAuthorForm);
        }
      "
    />
    <PaginationControls
      v-model:current-page="currentPage"
      v-model:is-disabled="isDisabled"
      :total-pages="totalPages"
      :total-items="totalItems"
    />
  </PageLayout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import PageLayout from "@/components/Layout/PageLayout.vue";
import { usePaginatedAuthors } from "@/composables/usePaginatedAuthors";
import PaginationControls from "@/components/UI/PaginationControls.vue";
import SearchBar from "@/components/UI/SearchBar.vue";
import { useComponent } from "@/composables/switchComponent";
import BaseModal from "@/components/UI/BaseModal.vue";
import CreateAuthorForm from "@/components/UI/Forms/Authors/CreateAuthorForm.vue";
import EditAuthorForm from "@/components/UI/Forms/Authors/EditAuthorForm.vue";
import type { Author } from "@/types/authorType";
import DeleteAuthorForm from "@/components/UI/Forms/Authors/DeleteAuthorForm.vue";
import AuthorsList from "@/components/UI/Authors/AuthorsList.vue";
import { useAuthenticationStore } from "@/stores/authenticationStore";

const selectedAuthor = ref();
const auth = useAuthenticationStore();

const {
  authors,
  currentPage,
  totalItems,
  isDisabled,
  totalPages,
  query,
  fetchRequest,
} = usePaginatedAuthors();

const { currentForm, toggleModal, switchComponent } = useComponent();

const selectAuthor = (author: Author) => {
  selectedAuthor.value = author;
};

const handleSubmit = (isSuccess: boolean) => {
  if (isSuccess) {
    fetchRequest();
  }
  toggleModal.value = false;
};
</script>
