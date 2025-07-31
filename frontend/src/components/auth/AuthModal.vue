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
    class="flex h-dvh w-full items-center justify-center bg-gradient-to-t from-blue-700 via-blue-950 to-black"
  >
    <div
      class="relative flex w-full max-w-[500px] flex-col gap-6 rounded-3xl bg-black/40 p-8 text-white shadow-2xl ring-1 ring-white/10 backdrop-blur-xl"
    >
      <div
        class="absolute top-4 right-4 flex cursor-pointer items-center justify-center rounded-full bg-slate-600 p-2 text-white"
      >
        ❌
      </div>
      <div class="mb-6 flex w-fit items-center gap-1 rounded-4xl bg-slate-800/60 p-1">
        <button
          class="w-fit cursor-pointer rounded-3xl px-4 py-2 text-sm transition"
          :class="activeTab ? 'bg-slate-950/80 text-white' : 'text-slate-400 hover:text-white'"
        >
          Sign up
        </button>
        <button
          class="w-fit cursor-pointer rounded-3xl px-4 py-2 text-sm transition"
          :class="!activeTab ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'"
        >
          Sign in
        </button>
      </div>
      <form class="flex w-full flex-col gap-4">
        <h2 class="mb-2 text-2xl">Create an account</h2>
        <div class="mb-2 flex flex-col gap-4">
          <template
            v-for="input in inputs"
            :key="input.name"
          >
            <label class="relative">
              <input
                :type="input.type"
                :placeholder="input.placeholder"
                class="w-full rounded-lg border border-transparent bg-slate-800/70 p-3 pl-10 text-sm text-white transition duration-700 ease-in-out outline-none placeholder:text-slate-500 focus:border-blue-500 focus:bg-slate-700/70"
              />
              <component
                :is="input.icon"
                class="absolute top-1/2 left-3 size-5 -translate-y-1/2 text-slate-300"
              />
            </label>
          </template>
        </div>

        <button
          type="submit"
          class="cursor-pointer rounded-md bg-blue-600 py-2 text-white transition-all duration-300 outline-none hover:bg-blue-800 focus:bg-blue-400"
        >
          Create an account
        </button>
      </form>

      <div class="grid grid-cols-12 gap-2">
        <div class="col-span-4 border-t border-slate-600" />
        <span class="col-span-4 text-center text-sm text-slate-400 uppercase">or sign in with</span>
        <div class="col-span-4 border-t border-slate-600" />
      </div>

      <button
        type="submit"
        class="cursor-pointer rounded-md bg-indigo-600 py-2 text-white transition-all duration-300 outline-none hover:bg-indigo-700 focus:bg-indigo-500"
      >
        Twitch
      </button>

      <p class="text-center text-sm text-slate-400">
        By creating an account, you agree to our Terms & Services
      </p>
    </div>
  </div>
</template>
