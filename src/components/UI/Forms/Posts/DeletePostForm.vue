<template>
  <form @submit.prevent="onSubmit">
    <h3>Do you want to delete?</h3>
    <div class="form-group">
      <label for="title">Title</label>
      <input type="text" id="title" required maxlength="20" v-model="title" disabled/>
    </div>
    <div class="form-group">
      <label for="authorId">Author</label>
      <selectAuthor v-model:selected-author="authorId" disabled/>
    </div>
    <div class="form-group">
      <label for="content">Content</label>
      <textarea for="content" rows="8" maxlength="200" v-model="body" disabled></textarea>
    </div>

    <button type="submit">Submit</button>
  </form>
</template>

<script setup lang="ts">
import { deletePost } from '@/services/postService';
import { useNotificationStore } from '@/stores/notificationStore';
import selectAuthor from './selectAuthor.vue';
import { ref, watch } from 'vue';

const props = defineProps(['post'])
const store = useNotificationStore();
const emit = defineEmits(['submit-form']);
const isSuccess = ref(false);
const itemDeleted = ref(false);
const id = ref();
const title = ref('');
const authorId = ref();
const body = ref('')

const onSubmit = async () => {
    try {
        await deletePost(id.value);
        store.AddNotification({
            type: 'success',
            message: 'Post deleted successfully'
        });
        isSuccess.value = true;
        emit('submit-form', isSuccess)
    }
    catch (error: any) {
        store.AddNotification({
            type: 'error',
            message: error
        });
    }
}

watch(() => props.post, (newPost) => {
  id.value = newPost.id
  title.value = newPost.title;
  authorId.value = newPost.author.id;
  body.value = newPost.body;
}, {immediate: true})

</script>

<style scoped>
button {
    background-color: var(--red);
}
</style>
