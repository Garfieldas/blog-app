<template>
  <BaseModal
    v-model:toggle-modal="toggleModal"
    @modal-closed="toggleModal = false"
  >
    <slot>
      <component
        :is="currentForm"
        :post="selectedPost"
        @submit-form="handleSubmit"
      />
    </slot>
  </BaseModal>
  <Teleport to=".header-left">
    <SearchBar v-model:query="query" v-model:is-disabled="isDisabled" />
  </Teleport>
  <PageLayout title="Posts">
      <div v-if="posts.length === 0" class="no-data">
        <h3>No posts found.</h3>
      </div>
      <div class="post-actions" v-if="auth.isLoggedIn">
        <a class="button" @click="switchComponent(CreatePostForm)">Create new Post</a>
      </div>
    <PostsList
      :posts="posts"
      @edit-post="
        (post) => {
          selectPost(post);
          switchComponent(EditPostForm);
        }
      "
      @delete-post="
        (post) => {
          selectPost(post);
          switchComponent(DeletePostForm);
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
import PageLayout from "@/components/Layout/PageLayout.vue";
import SearchBar from "@/components/UI/SearchBar.vue";
import PostsList from "@/components/UI/Posts/PostsList.vue";
import { usePaginatedPosts } from "@/composables/usePaginatedPosts";
import PaginationControls from "@/components/UI/PaginationControls.vue";
import BaseModal from "@/components/UI/BaseModal.vue";
import { useComponent } from "@/composables/switchComponent";
import CreatePostForm from "@/components/UI/Forms/Posts/CreatePostForm.vue";
import { ref } from "vue";
import type { Post } from "@/types/postType";
import EditPostForm from "@/components/UI/Forms/Posts/EditPostForm.vue";
import DeletePostForm from "@/components/UI/Forms/Posts/DeletePostForm.vue";
import { useAuthenticationStore } from "@/stores/authenticationStore";

const selectedPost = ref();
const auth = useAuthenticationStore();

const selectPost = (post: Post) => {
  selectedPost.value = post;
};

const handleSubmit = (isSuccess: boolean) => {
  if (isSuccess) {
    fetchRequest();
  }
  toggleModal.value = false;
};

const {
  posts,
  currentPage,
  totalItems,
  isDisabled,
  totalPages,
  query,
  fetchRequest,
} = usePaginatedPosts();

const { currentForm, toggleModal, switchComponent } = useComponent();

</script>
