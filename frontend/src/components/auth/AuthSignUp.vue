<script setup lang="ts">
import { reactive, type Component } from 'vue';
import { ZodError } from 'zod';
import AuthInput from './AuthInput.vue';
import { IconEmail, IconPassword, IconUser } from '@/assets/icons';
import { registerSchema, type RegisterForm } from '@/schemas/registerSchema';

type InputName = 'username' | 'email' | 'password';

type Input = {
  name: InputName;
  type: 'text' | 'email' | 'password';
  placeholder: string;
  icon: Component;
};

const inputs: Input[] = [
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

const form = reactive<RegisterForm>({
  username: '',
  email: '',
  password: '',
});

const errors = reactive<Record<InputName, string>>({
  username: '',
  email: '',
  password: '',
});

const validate = (): boolean => {
  errors.username = '';
  errors.email = '';
  errors.password = '';

  try {
    registerSchema.parse(form);
    return true;
  } catch (e) {
    if (e instanceof ZodError) {
      for (const issue of e.issues) {
        const field = issue.path[0];
        if (typeof field === 'string' && field in errors) {
          errors[field as InputName] = issue.message;
        }
      }
    }
    return false;
  }
};

const onSubmit = () => {
  if (validate()) {
    console.log('Submitted:', form);

    form.username = '';
    form.email = '';
    form.password = '';
  }
};
</script>

<template>
  <form
    class="flex w-full flex-col"
    @submit.prevent="onSubmit"
  >
    <h2 class="mb-6 text-2xl">Create an account</h2>
    <div class="mb-6 flex flex-col gap-6">
      <AuthInput
        v-for="input in inputs"
        :key="input.name"
        v-model="form[input.name]"
        :input="input"
        :error="errors[input.name]"
      />
    </div>
    <button
      type="submit"
      class="cursor-pointer rounded-md bg-blue-500 py-2 text-white transition-colors duration-300 hover:bg-blue-600 focus:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-800 dark:focus:bg-blue-400 dark:focus-visible:ring-blue-500"
    >
      Create an account
    </button>
  </form>
</template>
