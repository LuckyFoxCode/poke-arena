<script setup lang="ts">
import { IconClose, IconEmail, IconPassword, IconUser } from '@/assets/icons';
import { ref } from 'vue';

const activeTab = ref(true);

const inputs = [
  {
    name: 'username',
    type: 'text',
    placeholder: 'Username',
    icon: IconUser,
  },
  {
    name: 'email',
    type: 'email',
    placeholder: 'Enter your e-mail',
    icon: IconEmail,
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'Enter your password',
    icon: IconPassword,
  },
];
</script>

<template>
  <div
    class="flex h-dvh w-full items-center justify-center bg-gradient-to-t from-blue-200 via-white to-slate-100 dark:from-blue-700 dark:via-blue-950 dark:to-black"
  >
    <div
      class="relative flex w-full max-w-[500px] flex-col gap-6 rounded-3xl bg-white/70 p-8 text-slate-900 shadow-2xl ring-1 ring-black/10 backdrop-blur-xl dark:bg-black/40 dark:text-white dark:ring-white/10"
    >
      <!-- Закрытие -->
      <button
        type="button"
        class="absolute top-4 right-4 flex cursor-pointer items-center justify-center rounded-full bg-slate-300 p-2 text-slate-800 transition-colors duration-300 hover:bg-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:bg-slate-600 dark:text-white dark:hover:bg-slate-700 dark:focus-visible:ring-blue-400"
      >
        <IconClose class="size-5" />
      </button>

      <!-- Tabs -->
      <div
        class="mb-6 flex w-fit items-center gap-1 rounded-4xl bg-slate-200/70 p-1 dark:bg-slate-800/60"
      >
        <button
          class="w-fit cursor-pointer rounded-3xl px-4 py-2 text-sm transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:focus-visible:ring-blue-400"
          :class="
            activeTab
              ? 'bg-slate-300 text-slate-900 dark:bg-slate-950/80 dark:text-white'
              : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
          "
        >
          Sign up
        </button>
        <button
          class="w-fit cursor-pointer rounded-3xl px-4 py-2 text-sm transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:focus-visible:ring-blue-400"
          :class="
            !activeTab
              ? 'bg-slate-300 text-slate-900 dark:bg-slate-700 dark:text-white'
              : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
          "
        >
          Sign in
        </button>
      </div>

      <!-- Форма -->
      <form class="flex w-full flex-col gap-4">
        <h2 class="mb-2 text-2xl">Create an account</h2>
        <div class="mb-2 flex flex-col gap-4">
          <template
            v-for="input in inputs"
            :key="input.name"
          >
            <label class="relative transition-colors duration-300">
              <input
                :type="input.type"
                :placeholder="input.placeholder"
                class="w-full rounded-lg border border-transparent bg-slate-100 p-3 pl-10 text-sm text-slate-900 transition-colors duration-300 ease-in-out outline-none placeholder:text-slate-400 focus:border-blue-500 focus:bg-white dark:bg-slate-800/70 dark:text-white dark:placeholder:text-slate-500 dark:focus:bg-slate-700/70"
              />
              <component
                :is="input.icon"
                class="absolute top-1/2 left-3 size-5 -translate-y-1/2 text-slate-500 dark:text-slate-300"
              />
            </label>
          </template>
        </div>

        <button
          type="submit"
          class="cursor-pointer rounded-md bg-blue-500 py-2 text-white transition-colors duration-300 hover:bg-blue-600 focus:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-800 dark:focus:bg-blue-400 dark:focus-visible:ring-blue-500"
        >
          Create an account
        </button>
      </form>

      <!-- Разделитель -->
      <div class="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
        <div class="h-px flex-1 bg-slate-300 dark:bg-slate-600"></div>
        <span class="whitespace-nowrap uppercase">or sign in with</span>
        <div class="h-px flex-1 bg-slate-300 dark:bg-slate-600"></div>
      </div>

      <!-- Twitch -->
      <button
        type="submit"
        class="cursor-pointer rounded-md bg-indigo-500 py-2 text-white transition-colors duration-300 hover:bg-indigo-600 focus:bg-indigo-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:bg-indigo-500 dark:focus-visible:ring-indigo-500"
      >
        Twitch
      </button>

      <p class="text-center text-sm text-slate-500 dark:text-slate-400">
        By creating an account, you agree to our Terms & Services
      </p>
    </div>
  </div>
</template>
