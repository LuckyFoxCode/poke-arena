<script setup lang="ts">
defineProps<{
  isFormReady: boolean;
}>();
</script>

<template>
  <button
    type="submit"
    :disabled="!isFormReady"
    class="cursor-pointer rounded-md bg-blue-500 py-2 text-white transition-all duration-300 hover:bg-blue-600 focus:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 enabled:hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-600 dark:focus:bg-blue-400 dark:focus-visible:ring-blue-500 dark:enabled:hover:bg-blue-800"
  >
    <slot />
  </button>
</template>
