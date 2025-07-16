<template>
    <form @submit.prevent="onSubmit">
        <h3>Edit Author</h3>

        <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" required maxlength="20" v-model="name"
                :class="{ 'is-invalid': errors.name }" />
            <div v-if="errors.name" class="error-message">{{ errors.name }}</div>
        </div>

        <div class="form-group">
            <label for="surname">Surname</label>
            <input type="text" id="surname" required maxlength="20" v-model="surname"
                :class="{ 'is-invalid': errors.surname }" />
            <div v-if="errors.surname" class="error-message">{{ errors.surname }}</div>
        </div>

        <button type="submit">Submit</button>
    </form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { editAuthor } from '@/services/authorService';
import { useNotificationStore } from '@/stores/notificationStore';
import { ref, watch } from 'vue';

const props = defineProps(['author']);
const store = useNotificationStore();
const emit = defineEmits(['submit-form']);
const isSuccess = ref(false);
const id = ref();

const authorSchema = z.object({
    name: z.string()
        .trim()
        .min(3, 'Name is required (minimum 3 characters)')
        .max(20, 'Name must be a maximum of 20 characters'),
    surname: z.string()
        .trim()
        .min(3, 'Surname is required (minimum 5 characters)')
        .max(20, 'Surname must be a maximum of 20 characters')
});

const { handleSubmit, defineField, errors, resetForm } = useForm({
    validationSchema: toTypedSchema(authorSchema),
});

const [name] = defineField('name');
const [surname] = defineField('surname');

const onSubmit = handleSubmit(async (values) => {

    try {
        const updated_at = new Date().toISOString();
        await editAuthor(id.value, values.name, values.surname, updated_at);
        store.AddNotification({
            type: 'success',
            message: 'Author edited successfully!'
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

watch(() => props.author, (newAuthor) => {
    name.value = newAuthor.name;
    surname.value = newAuthor.surname;
    id.value = newAuthor.id
}, { immediate: true })

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