import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { computed } from 'vue';
import type { AuthInputConfig, InputName } from '@/constants/authInputs';
import type { ZodType } from 'zod';
import type { User } from '@/types/user';

type EmitEvent = 'add-user' | 'trigger-toast';

interface EmitPayloadMap {
  'add-user': User;
  'trigger-toast': {
    message: string;
    type: 'success' | 'error';
  };
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

      const newUser: User = {
        ...credentials,
        id: crypto.randomUUID(),
        createAt: new Date().toISOString(),
        role: 'user',
        authProvider: 'local',
      };

      const existingUsers: User[] = JSON.parse(localStorage.getItem('users') || '[]');

      const isUserExists = existingUsers.some(
        (user) => user.email.toLowerCase() === newUser.email.toLowerCase(),
      );

      if (isUserExists) {
        emit('trigger-toast', {
          message: `This email is already in use!`,
          type: 'error',
        });
        return;
      }

      emit('add-user', newUser);
      emit('trigger-toast', {
        message: `Account ${newUser.username} created successfully!`,
        type: 'success',
      });

      resetForm();
    } else if (mode === 'signin') {
      const credentials = values as Pick<User, 'email' | 'password'>;

      const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

      const user = users.find(
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
