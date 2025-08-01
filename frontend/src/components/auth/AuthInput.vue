<script setup lang="ts">
import type { AuthInputProps } from '@/types/auth';

const props = defineProps<{
  input: AuthInputProps;
  error?: string;
  modelValue?: string;
}>();

const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <label class="relative transition-colors duration-300">
    <input
      :id="input.name"
      :name="input.name"
      :type="input.type"
      :placeholder="input.placeholder"
      :value="modelValue"
      class="z-10 w-full rounded-lg border border-transparent bg-slate-100 p-3 pl-10 text-sm text-slate-900 transition-colors duration-300 ease-in-out outline-none placeholder:text-slate-400 focus:border-blue-500 focus:bg-white dark:bg-slate-800/70 dark:text-white dark:placeholder:text-slate-500 dark:focus:bg-slate-700/70"
      @input="(e: Event) => emit('update:modelValue', (e.target as HTMLInputElement).value)"
    />
    <component
      :is="input.icon"
      class="absolute top-1/2 left-3 size-5 -translate-y-1/2 text-slate-500 dark:text-slate-300"
    />
    <p
      class="absolute left-0 -z-10 text-xs text-rose-500 transition-all duration-500"
      :class="error ? '-bottom-5 opacity-100' : 'bottom-0 opacity-0'"
    >
      {{ props.error }}
    </p>
  </label>
</template>
