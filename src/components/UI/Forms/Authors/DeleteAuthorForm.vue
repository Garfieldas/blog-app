<template>
    <form @submit.prevent="onSubmit">
        <h3>Do you want to delete?</h3>

        <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" required maxlength="20" v-model="name" disabled/>
        </div>

        <div class="form-group">
            <label for="surname">Surname</label>
            <input type="text" id="surname" required maxlength="20" v-model="surname" disabled/>
        </div>

        <button type="submit">Submit</button>
    </form>
</template>

<script setup lang="ts">
import { deleteAuthor } from '@/composables/authorService';
import { useNotificationStore } from '@/stores/notificationStore';
import { ref, watch } from 'vue';

const props = defineProps(['author']);
const store = useNotificationStore();
const emit = defineEmits(['submit-form']);
const isSuccess = ref(false);
const id = ref();
const name = ref('');
const surname = ref('')

const onSubmit = async () => {
    const response = await deleteAuthor(id.value);

    if (!response.status) {
        store.AddNotification({
            type: 'error',
            message: response.error
        });
    }
    else{
        store.AddNotification({
            type: 'success',
            message: 'Author deleted successfully'
        });
        isSuccess.value = true;
        emit('submit-form', isSuccess)
    }
}

watch(() => props.author, (newAuthor) => {
    name.value = newAuthor.name;
    surname.value = newAuthor.surname;
    id.value = newAuthor.id
}, { immediate: true })

</script>

<style scoped>
h3 {
    color: var(--red);
}

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

input.is-invalid {
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
    background-color: var(--red);
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