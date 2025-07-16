<template>
        <div class="overlay" :class="{'show': showOverlay}"></div>
</template>
<script setup lang="ts">
const props = defineProps(['showOverlay'])
</script>