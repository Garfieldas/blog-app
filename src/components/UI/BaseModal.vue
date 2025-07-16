<template>
    <Overlay :show-overlay="toggleModal"/>
    <dialog class="modal" ref="modalRef">
        <span @click="closeModal"><i class="fa-solid fa-circle-xmark"></i></span>
        <slot></slot>
    </dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
const modalRef = ref<HTMLDialogElement | null>(null);
const emit = defineEmits(['modal-closed', 'submit']);
const toggleModal = defineModel('toggleModal');
import Overlay from '../Layout/Overlay.vue';

const showModal = () => {
    modalRef.value?.show();
}
const closeModal = () => {
    modalRef.value?.close();
    emit('modal-closed')
}
watch(toggleModal, () => {
    if(toggleModal.value === true){
        showModal();
    }
    else {
        closeModal();
    }
})
</script>

<style>
dialog {
    z-index: 1000;
}
</style>