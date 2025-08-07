import { IconEmail, IconPassword, IconUser } from '@/assets/icons';
import type { AuthInputProps, InputName } from '@/types';

export const authInputs: Record<InputName, AuthInputProps> = {
  username: {
    name: 'username',
    type: 'text',
    placeholder: 'Username',
    icon: IconUser,
  },
  email: {
    name: 'email',
    type: 'email',
    placeholder: 'Enter your e-mail',
    icon: IconEmail,
  },
  password: {
    name: 'password',
    type: 'password',
    placeholder: 'Enter your password',
    icon: IconPassword,
  },
};
