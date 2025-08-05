<script setup lang="ts">
defineProps<{
  title: string;
  onSubmit: () => void;
}>();
</script>

<template>
  <form
    class="flex w-full flex-col"
    @submit.prevent="onSubmit"
  >
    <h2 class="mb-6 text-2xl">{{ title }}</h2>
    <div class="mb-6 flex flex-col gap-6">
      <slot name="inputs" />
    </div>
    <slot name="button" />
  </form>
</template>
