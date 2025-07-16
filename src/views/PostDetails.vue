<template>
  <main class="main" v-if="post">
      <BaseModal @modal-closed="toggleModal = false" v-model:toggle-modal="toggleModal">
      <slot>
        <component :is="currentForm" @submit-form="handleSubmit" :post="post" />
      </slot>
    </BaseModal>
    <div class="title-container">
      <h1 class="post-title">{{ post.title }}</h1>
    </div>
    <article class="post-content">
      <p>{{ post?.body }}</p>
    </article>
    <div class="post-bottom">
      <div class="post-actions" v-if="auth.isLoggedIn">
        <a class="button" @click="goBack">Back</a>
        <a class="button" @click="switchComponent(EditPostForm)">Edit</a>
        <a class="button delete" @click="switchComponent(DeletePostForm)"> Delete</a>
      </div>
      <div class="post-actions" v-else>
        <a class="button" @click="goBack">Back</a>
      </div>
      <div class="post-meta">
        <p><strong>Author</strong>: {{ post.author.name }} {{ post.author.surname }}</p>
        <p>
        {{ displayDate(post.created_at, post.updated_at).label }}:
        {{ displayDate(post.created_at, post.updated_at).date }}
      </p>
      </div>
    </div>
  </main>
  <p v-else>
    Loading...
  </p>
</template>
<script setup lang="ts">
import { onMounted  } from 'vue';
import { useAuthenticationStore } from '@/stores/authenticationStore';
import EditPostForm from '@/components/UI/Forms/Posts/EditPostForm.vue';
import BaseModal from '@/components/UI/BaseModal.vue';
import DeletePostForm from '@/components/UI/Forms/Posts/DeletePostForm.vue';
import { useSignlePost } from '@/composables/useSinglePost';
import { useComponent } from '@/composables/switchComponent';
import { displayDate } from '../utils/formatDate';

const props = defineProps(['id'])

const { post, goBack, fetchPost, router } = useSignlePost();

const { currentForm, toggleModal, switchComponent } = useComponent();

const auth = useAuthenticationStore();

const handleSubmit = (isSuccess: boolean, itemDeleted: boolean) => {
  if (itemDeleted){
    router.replace({name: 'posts'})
    return;
  }
  if (isSuccess) {
    fetchPost(props.id);
  }
  toggleModal.value = false
}

onMounted(async () => {
  fetchPost(props.id)
})

</script>

<style scoped>
.main {
  background-color: var(--gray);
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  color: black;
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

.posts {
  text-align: left;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
}

.title-container {
  display: flex;
  justify-content: center;
}

.post-title {
  text-align: center;
  margin-bottom: 1rem;
}

.post-title::after {
  content: '';
  display: block;
  width: 170px;
  border-bottom: 2px solid var(--border);
}

.post-content {
  display: flex;
  font-size: 1rem;
  line-height: 1.2rem;
  margin-top: 2rem;
}

.post-bottom {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
}

.post-meta {
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  gap: 0.2rem;
}

.post-actions {
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  font-size: 0.7rem;
}

.button {
  margin-top: auto;
  background-color: var(--blue);
  text-align: center;
  min-width: 50px;
  padding: 10px 15px;
  border-radius: 999px;
  border: none;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s, transform 0.1s;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  color: var(--white);
}

.delete {
  background-color: var(--red);
}

.button:hover {
  background-color: var(--border);
}

@media (max-width: 925px) {

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 220px;
    height: 100vh;
    z-index: 1000;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  .sidebar.show {
    transform: translateX(0);
  }

  .sidebar.hidden {
    transform: translateX(-100%);
  }

  .header {
    grid-column: 1 / 3;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    position: fixed;
    padding: 1rem;
    width: 100%;
  }

  .header-right img {
    display: none;
  }

  .nav-button {
    display: block;
  }

  #search {
    width: clamp(175px, 50%, 300px)
  }

  .header-left {
    margin: 0 auto;
    text-align: center;
  }

  .main {
    grid-column: 1 / 3;
  }
}

@media (max-width: 600px) {
  .button {
    font-size: 14px;
    padding: 8px 12px;
  }
}
</style>