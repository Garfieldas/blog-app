<template>
    <Form v-model:email="email" v-model:password="password" @submit="login" />
</template>
<script setup lang="ts">
import Form from '@/components/UI/Form.vue';
import { getToken } from '@/composables/authorizationService';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useNotificationStore } from '@/stores/notificationStore';

const email = ref('');
const password = ref('');
const router = useRouter();
const store = useNotificationStore();

const login = async () => {
    email.value = email.value.trim();
    password.value = password.value.trim();
    if (!email.value || !password.value) {
        store.AddNotification({
            type: 'error',
            message: 'Do not leave form fields empty'
        })
        return;
    }
    const response = await getToken(email.value, password.value);
    const status = response?.status;
    if (status) {
        router.replace({ name: 'posts' })
        store.AddNotification({
            type: 'success',
            message: 'Authorization was successfull'
        })
        email.value = '';
        password.value = ''
    }
    else {
        store.AddNotification({
            type: 'error',
            message: 'Failed to authorize'
        })
    }
}
</script>