import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { computed } from 'vue';
import type { AuthInputConfig, InputName } from '@/constants/authInputs';
import type { ZodType } from 'zod';
import type { User } from '@/types/user';
import { useAuthStore } from '@/stores/useAuthStore';

type EmitEvent = 'trigger-toast' | 'set-tab';

interface EmitPayloadMap {
  'trigger-toast': {
    message: string;
    type: 'success' | 'error';
  };
  'set-tab': 'signin';
}

type EmitFn = <K extends EmitEvent>(event: K, payload: EmitPayloadMap[K]) => void;

export function useAuthForm(
  schema: ZodType<unknown>,
  fieldNames: readonly InputName[],
  inputConfig: Record<InputName, AuthInputConfig>,
  emit: EmitFn,
  mode: 'signup' | 'signin',
) {
  const { handleSubmit, errors, defineField, meta, resetForm } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  const authStore = useAuthStore();

  const customInputs = computed(() =>
    fieldNames.map((name) => {
      const [model, attrs] = defineField(name);
      const input = inputConfig[name];

      return {
        ...input,
        model,
        attrs,
      };
    }),
  );

  const isFormReady = computed(() => {
    const allFilled = customInputs.value.every((input) => Boolean(input.model.value));

    return meta.value.valid && allFilled;
  });

  const onSubmit = handleSubmit((values) => {
    if (mode === 'signup') {
      const credentials = values as Pick<User, 'username' | 'email' | 'password'>;

      const success = authStore.register({
        username: credentials.username,
        email: credentials.email,
        password: credentials.password,
      });

      if (!success) {
        emit('trigger-toast', {
          message: `This email is already in use!`,
          type: 'error',
        });
        return;
      }

      emit('trigger-toast', {
        message: `Account ${values.username} created successfully!`,
        type: 'success',
      });
      emit('set-tab', 'signin');

      resetForm();
    } else if (mode === 'signin') {
      const credentials = values as Pick<User, 'email' | 'password'>;

      const user = authStore.users.find(
        (user) =>
          user.email.toLowerCase() === credentials.email.toLowerCase() &&
          user.password === values.password,
      );

      if (!user) {
        emit('trigger-toast', {
          message: `Invalid email or password`,
          type: 'error',
        });
        return;
      }

      authStore.setCurrentUser(user);

      emit('trigger-toast', {
        message: `Welcome back, ${user.username}`,
        type: 'success',
      });

      resetForm();
    }
  });

  return {
    customInputs,
    isFormReady,
    errors,
    onSubmit,
  };
}
