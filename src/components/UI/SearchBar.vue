<template>
  <div class="search">
    <img src="../../assets/icons/search.svg" alt="search" />
    <input type="text" name="search" id="search" v-model="query"
    :disabled="isDisabled"/>
  </div>
</template>

<script setup lang="ts">
const query = defineModel('query')
const isDisabled = defineModel<boolean>('isDisabled')
</script>

<style>
input:disabled {
  border: 2px solid var(--red);
  cursor: not-allowed;
}
</style>
