<template>
    <Form v-model:email="email" v-model:password="password" @submit="login" />
</template>
<script setup lang="ts">
import Form from '@/components/UI/Form.vue';
import { getToken } from '@/services/authorizationService';
import { useRouter } from 'vue-router';
import { useNotificationStore } from '@/stores/notificationStore';
import { ref } from 'vue';

const router = useRouter();
const store = useNotificationStore();

const email = ref('');
const password = ref('');

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
    try {
        await getToken(email.value, password.value);
        store.AddNotification({
            type: 'success',
            message: 'Authorization was successfully!'
        });
        router.replace({ name: 'posts' })
    }
    catch (error: any){
        store.AddNotification({
            type: 'error',
            message: error
        })
    }
};
</script>