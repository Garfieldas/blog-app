<template>
    <div 
    class="notification"
    :class="[notification, notification.type]"
    >
    <p>
        <strong>{{ notification.type }}</strong>
        {{ notification.message }}
    </p>
    <span class="close-btn">
    <i class="fa-solid fa-circle-xmark"></i>
    </span>

    </div>
</template>
<script setup lang="ts">
const props = defineProps(['notification'])
</script>