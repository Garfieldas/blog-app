import { ref, shallowRef } from "vue"

export const useComponent = () => {
    const toggleModal = ref(false);
    const currentForm = shallowRef();

    const switchComponent = (component: any) => {
        toggleModal.value = true;
        currentForm.value = component;
    }

    return {
        currentForm,
        toggleModal,
        switchComponent
    }
}