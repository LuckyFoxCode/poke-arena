import { IconEmail, IconPassword, IconUser } from '@/assets/icons';
import type { Component } from 'vue';

export type InputName = 'username' | 'email' | 'password';

export interface AuthInputConfig {
  name: InputName;
  type: 'text' | 'email' | 'password';
  placeholder: string;
  icon: Component;
}

export const authInputs: Record<InputName, AuthInputConfig> = {
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
