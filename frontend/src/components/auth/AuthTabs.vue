<script setup lang="ts">
defineProps<{ activeTab: 'signup' | 'signin' }>();

const emit = defineEmits(['set-tab']);
</script>

<template>
  <div
    class="mb-6 flex w-fit items-center gap-1 rounded-4xl bg-slate-200/70 p-1 dark:bg-slate-800/60"
  >
    <button
      class="w-fit cursor-pointer rounded-3xl px-4 py-2 text-sm transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:focus-visible:ring-blue-400"
      :class="
        activeTab === 'signup'
          ? 'bg-slate-300 text-slate-900 dark:bg-slate-950/80 dark:text-white'
          : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
      "
      @click="() => emit('set-tab', 'signup')"
    >
      Sign up
    </button>
    <button
      class="w-fit cursor-pointer rounded-3xl px-4 py-2 text-sm transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:focus-visible:ring-blue-400"
      :class="
        activeTab === 'signin'
          ? 'bg-slate-300 text-slate-900 dark:bg-slate-700 dark:text-white'
          : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
      "
      @click="() => emit('set-tab', 'signin')"
    >
      Sign in
    </button>
  </div>
</template>
