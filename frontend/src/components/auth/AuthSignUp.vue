<script setup lang="ts">
import AuthInput from './AuthInput.vue';
import AuthButton from './AuthButton.vue';
import AuthForm from './AuthForm.vue';
import { useAuthForm } from '@/composables';
import { authInputs } from '@/constants';
import { registerSchema } from '@/schemas';
import type { EmitFn, EmitPayloadMap } from '@/types';

const emit = defineEmits({
  'set-tab': (_payload: EmitPayloadMap['set-tab']) => true,
  'trigger-toast': (_payload: EmitPayloadMap['trigger-toast']) => true,
}) as EmitFn;

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
