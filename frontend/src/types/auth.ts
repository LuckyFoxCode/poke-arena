import type { Component } from 'vue';

export type InputName = 'username' | 'email' | 'password';

export interface AuthInputProps {
  name: InputName;
  type: 'text' | 'email' | 'password';
  placeholder: string;
  icon: Component;
}
