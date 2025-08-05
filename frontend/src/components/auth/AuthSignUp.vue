<script setup lang="ts">
import { registerSchema } from '@/schemas/registerSchema';
import AuthInput from './AuthInput.vue';
import AuthButton from './AuthButton.vue';
import AuthForm from './AuthForm.vue';
import { authInputs } from '@/constants/authInputs';
import { useAuthForm } from '@/composables/useAuthForm';

const emit = defineEmits(['add-user', 'trigger-toast']);

const fieldNames = ['username', 'email', 'password'] as const;

const { customInputs, isFormReady, onSubmit, errors } = useAuthForm(
  registerSchema,
  fieldNames,
  authInputs,
  emit,
  'signup',
);
</script>

<template>
  <AuthForm
    title="Create an account"
    :on-submit="onSubmit"
  >
    <template #inputs>
      <AuthInput
        v-for="input in customInputs"
        :key="input.name"
        v-model="input.model.value"
        :input="input"
        :error="errors[input.name]"
        v-bind="input.attrs"
      />
    </template>
    <template #button>
      <AuthButton :is-form-ready="isFormReady"> Create an account </AuthButton>
    </template>
  </AuthForm>
</template>
