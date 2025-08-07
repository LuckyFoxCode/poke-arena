<script setup lang="ts">
import { ref } from 'vue';
import { IconClose } from '@/assets/icons';
import AuthSignUp from './AuthSignUp.vue';
import AuthTabs from './AuthTabs.vue';
import AuthSignIn from './AuthSignIn.vue';

const activeTab = ref<'signup' | 'signin'>('signup');
const toastMessage = ref<string>(' User added successfully!');
const toastType = ref<'success' | 'error'>('success');
const showToast = ref<boolean>(false);

const setTab = (newTab: 'signup' | 'signin') => (activeTab.value = newTab);

const triggerToast = ({ type, message }: { type: 'success' | 'error'; message: string }) => {
  toastType.value = type;
  toastMessage.value = message;
  showToast.value = true;

  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};
</script>

<template>
  <div
    class="flex h-dvh w-full items-center justify-center bg-gradient-to-t from-blue-200 via-white to-slate-100 dark:from-blue-700 dark:via-black dark:to-black"
  >
    <div
      class="relative flex w-full max-w-[500px] flex-col gap-6 rounded-3xl bg-white/70 p-8 text-slate-900 shadow-2xl ring-1 ring-black/10 backdrop-blur-xl dark:bg-black/40 dark:text-white dark:ring-white/10"
    >
      <button
        type="button"
        class="absolute top-4 right-4 flex cursor-pointer items-center justify-center rounded-full bg-slate-300 p-2 text-slate-800 transition-colors duration-300 hover:bg-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:bg-slate-600 dark:text-white dark:hover:bg-slate-700 dark:focus-visible:ring-blue-400"
      >
        <IconClose class="size-5" />
      </button>

      <AuthTabs
        :active-tab="activeTab"
        @set-tab="setTab"
      />

      <AuthSignUp
        v-if="activeTab === 'signup'"
        @trigger-toast="triggerToast"
        @set-tab="setTab"
      />

      <AuthSignIn
        v-if="activeTab === 'signin'"
        @trigger-toast="triggerToast"
      />

      <div class="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
        <div class="h-px flex-1 bg-slate-300 dark:bg-slate-600"></div>
        <span class="whitespace-nowrap uppercase">or sign in with</span>
        <div class="h-px flex-1 bg-slate-300 dark:bg-slate-600"></div>
      </div>
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
    <transition name="toast-fade">
      <div
        v-if="showToast"
        class="fixed right-4 bottom-4 z-50 rounded-md px-4 py-2 text-white shadow-lg"
        :class="toastType === 'success' ? 'bg-green-400' : 'bg-rose-500'"
      >
        {{ toastMessage }}
      </div>
    </transition>
  </div>
</template>

<style scoped>
.toast-fade-enter-active,
.toast-fade-leave-active {
  transition:
    opacity 0.5s,
    transform 0.5s;
}
.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
