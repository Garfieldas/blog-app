<template>
  <div class="post-actions">
    <a class="button"
    @click="previousBtn"
    :class="{disabled: currentPage === 1 || isDisabled}"
    >Previous</a>
    <a class="button delete"
    @click="nextBtn"
    :class="{disabled: currentPage >= totalPages || isDisabled}"
    >Next</a>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';

const currentPage: any = defineModel('currentPage');
const totalItems: any = defineModel('totalItems');
const isDisabled = defineModel('isDisabled');
const props = defineProps(['itemsPerPage'])
const totalPages = computed(() => {
  return Math.ceil(totalItems.value / props.itemsPerPage)
})

const nextBtn = () => {
  if (currentPage.value >= totalPages || isDisabled.value){
    return;
  }
  currentPage.value++;
}

const previousBtn = () => {
  if (currentPage.value === 1 || isDisabled.value){
    return;
  }
  currentPage.value--;
}
</script>
<style scoped>

.post-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-size: 0.7rem;
}

.button {
  margin-top: auto;
  background-color: var(--blue);
  text-align: center;
  min-width: 50px;
  border-radius: 999px;
  border: none;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s, transform 0.1s;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  color: var(--white);
}

.delete {
  background-color: var(--red);
}

.button:hover {
  background-color: var(--border);
}
.disabled {
  pointer-events: none;
  opacity: 0.5;
}

@media (max-width: 600px) {
  .button {
    font-size: 14px;
    padding: 8px 12px;
  }
}
</style>