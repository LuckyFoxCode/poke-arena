<script setup lang="ts">
import { IconEmail, IconPassword, IconUser } from '@/assets/icons';
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
    placeholder: 'Email',
    icon: IconEmail,
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'Password',
    icon: IconPassword,
  },
];
</script>

<template>
  <div
    class="flex h-dvh w-full items-center justify-center bg-gradient-to-tr from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
  >
    <div
      class="relative flex w-full max-w-[500px] flex-col gap-6 rounded-4xl bg-black/70 p-8 text-slate-400 backdrop-blur-md"
    >
      <div
        class="absolute top-4 right-4 flex cursor-pointer items-center justify-center rounded-full bg-slate-600 p-2 text-white"
      >
        ❌
      </div>
      <div class="flex w-fit items-center gap-1 rounded-4xl bg-black/70 p-1">
        <button
          class="auth-btn"
          :class="activeTab ? 'bg-slate-700 text-white' : ''"
        >
          Sign up
        </button>
        <button
          class="auth-btn"
          :class="!activeTab ? 'bg-slate-700 text-white' : ''"
        >
          Sign in
        </button>
      </div>
      <form class="flex w-full flex-col gap-3">
        <h2 class="mb-2 text-2xl text-white">Create an account</h2>
        <template
          v-for="input in inputs"
          :key="input.name"
        >
          <label class="relative">
            <input
              :type="input.type"
              :placeholder="input.placeholder"
              class="w-full rounded-sm border border-yellow-200 bg-slate-700 p-3 pl-10 text-sm outline-none placeholder:text-slate-500 focus:border-rose-500"
            />
            <component
              :is="input.icon"
              class="absolute top-1/2 left-2 size-5 -translate-y-1/2"
            />
          </label>
        </template>
        <button
          type="submit"
          class="cursor-pointer rounded-md bg-indigo-600 py-2 text-white transition-all duration-300 outline-none hover:bg-indigo-700 focus:bg-indigo-500"
        >
          Create an account
        </button>
      </form>

      <div class="grid grid-cols-12 gap-2">
        <div class="col-span-4 border-t border-slate-600" />
        <span class="col-span-4 flex items-center justify-center">or sign in with</span>
        <div class="col-span-4 border-t border-slate-600" />
      </div>

      <p class="text-center text-sm">By creating an account, you agree to our Terms & Services</p>
    </div>
  </div>
</template>
