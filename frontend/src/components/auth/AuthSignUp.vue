<script setup lang="ts">
import { computed, type Component } from 'vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { IconEmail, IconPassword, IconUser } from '@/assets/icons';
import { registerSchema } from '@/schemas/registerSchema';
import AuthInput from './AuthInput.vue';
import AuthButton from './AuthButton.vue';

type InputName = 'username' | 'email' | 'password';

interface Input {
  name: InputName;
  type: 'text' | 'email' | 'password';
  placeholder: string;
  icon: Component;
}

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

const customInputs = computed(() =>
  inputs.map((input) => {
    const [model, attrs] = defineField(input.name);

    return {
      ...input,
      model,
      attrs,
    };
  }),
);

const { handleSubmit, errors, defineField, meta, resetForm } = useForm({
  validationSchema: toTypedSchema(registerSchema),
});

const isFormReady = computed(() => {
  const allFilled = customInputs.value.every((input) => Boolean(input.model.value));

  return meta.value.valid && allFilled;
});

const onSubmit = handleSubmit((values) => {
  console.log(values);
  console.log('Submit');

  resetForm();
});
</script>

<template>
  <form
    class="flex w-full flex-col"
    @submit.prevent="onSubmit"
  >
    <h2 class="mb-6 text-2xl">Create an account</h2>
    <div class="mb-6 flex flex-col gap-6">
      <AuthInput
        v-for="input in customInputs"
        :key="input.name"
        v-model="input.model.value"
        :input="input"
        :error="errors[input.name]"
        v-bind="input.attrs"
      />
    </div>
    <AuthButton :is-form-ready="isFormReady"> Create an account </AuthButton>
  </form>
</template>
