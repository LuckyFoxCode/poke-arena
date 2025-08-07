<script setup lang="ts">
import AuthButton from './AuthButton.vue';
import AuthForm from './AuthForm.vue';
import AuthInput from './AuthInput.vue';
import { useAuthForm } from '@/composables';
import { authInputs } from '@/constants';
import { loginSchema } from '@/schemas';
import type { EmitFn, EmitPayloadMap } from '@/types';

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
