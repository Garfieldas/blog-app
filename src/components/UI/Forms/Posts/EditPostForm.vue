<template>
  <form @submit.prevent="onSubmit">
    <h3>Edit Post</h3>
    <div class="form-group">
      <label for="title">Title</label>
      <input type="text" id="title" required maxlength="20" v-model="title" :class="{ 'is-invalid': errors.title }"/>
        <div v-if="errors.title" class="error-message">{{ errors.title }}</div>
    </div>
    <div class="form-group">
      <label for="authorId">Author</label>
      <selectAuthor :class="{ 'is-invalid': errors.authorId }" v-model:selected-author="authorId"/>
      <div v-if="errors.authorId" class="error-message">{{ errors.authorId }}</div>
    </div>
    <div class="form-group">
      <label for="content">Content</label>
      <textarea for="content" rows="8" maxlength="200" v-model="body" :class="{ 'is-invalid': errors.body }"></textarea>
      <div v-if="errors.body" class="error-message">{{ errors.body }}</div>
    </div>

    <button type="submit">Submit</button>
  </form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { editPost } from '@/services/postService';
import { useNotificationStore } from '@/stores/notificationStore';
import selectAuthor from './selectAuthor.vue';
import { ref, watch } from 'vue';

const props = defineProps(['post'])
const store = useNotificationStore();
const emit = defineEmits(['submit-form']);
const isSuccess = ref(false);
const id = ref();

const postSchema = z.object({
    title: z.string()
        .trim()
        .min(3, 'Title is required (minimum 3 characters)')
        .max(30, 'Title must be a maximum of 20 characters'),
    authorId: z.number()
      .min(1, 'Author must be selected'),
    body: z.string()
        .trim()
        .min(10, 'Body is required (minimum 10 characters)')
        .max(200, 'Body must be a maximum of 200 characters')
});

const { handleSubmit, defineField, errors, resetForm } = useForm({
    validationSchema: toTypedSchema(postSchema),
});

const [title] = defineField('title');
const [authorId] = defineField('authorId');
const [body] = defineField('body');

const onSubmit = handleSubmit(async (values) => {

  try {
    const updated_at = new Date().toISOString();
    await editPost(id.value,values.title, values.authorId, values.body, updated_at);
    store.AddNotification({
      type: 'success',
      message: 'Post updated successfully!'
    });
    resetForm();
    isSuccess.value = true;
    emit('submit-form', isSuccess)
  }
  catch (error: any) {

    store.AddNotification({
      type: 'error',
      message: error
    });
  }
});

watch(() => props.post, (newPost) => {
  id.value = newPost.id
  title.value = newPost.title;
  authorId.value = newPost.author.id;
  body.value = newPost.body;
}, {immediate: true})

</script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.3rem;
  font-weight: bold;
}

input[type="text"] {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input.is-invalid, select.is-invalid {
  border-color: red;
  box-shadow: 0 0 0 0.1rem rgba(255, 0, 0, 0.25);
}

.error-message {
  color: red;
  font-size: 0.875em;
  margin-top: 0.25rem;
  display: block;
}

button[type="submit"] {
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}
</style>
