<script setup lang="ts">
import { useAuthForm } from '@/composables/useAuthForm';
import AuthButton from './AuthButton.vue';
import AuthForm from './AuthForm.vue';
import AuthInput from './AuthInput.vue';
import { authInputs } from '@/constants/authInputs';
import { loginSchema } from '@/schemas/loginSchema';
import type { EmitFn, EmitPayloadMap } from '@/types/emits';

const emit = defineEmits({
  'trigger-toast': (_payload: EmitPayloadMap['trigger-toast']) => true,
}) as EmitFn;

const fieldNames = ['email', 'password'] as const;

const { customInputs, isFormReady, onSubmit, errors } = useAuthForm(
  loginSchema,
  fieldNames,
  authInputs,
  emit,
  'signin',
);
</script>

<template>
  <AuthForm
    title="Welcome back!"
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
      <AuthButton :is-form-ready="isFormReady">Log In</AuthButton>
    </template>
  </AuthForm>
</template>
