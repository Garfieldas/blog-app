<template>
    <dialog class="modal" ref="modalRef">
        <span @click="closeModal"><i class="fa-solid fa-circle-xmark"></i></span>
        <form>
            <h3>{{ title }}</h3>
            <slot name="modal-content">
            </slot>
            <button type="submit">Submit</button>
        </form>
    </dialog>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps(['title'])
const modalRef = ref<HTMLDialogElement | null>(null);
const emit = defineEmits(['modal-closed']);
const toggleModal = defineModel('toggleModal')
const showModal = () => {
    modalRef.value?.showModal();
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