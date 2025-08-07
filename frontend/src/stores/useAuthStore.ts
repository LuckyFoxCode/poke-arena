import { defineStore } from 'pinia';
import type { User } from '@/types';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    users: JSON.parse(localStorage.getItem('users') || '[]') as User[],
    currentUser: JSON.parse(localStorage.getItem('currentUser') || 'null') as User | null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.currentUser,
  },
  actions: {
    register(newUser: Omit<User, 'id' | 'createAt' | 'role' | 'authProvider'>): boolean {
      const exist = this.users.some((u) => u.email.toLowerCase() === newUser.email.toLowerCase());

      if (exist) {
        return false;
      }

      const user: User = {
        ...newUser,
        id: crypto.randomUUID(),
        createAt: new Date().toISOString(),
        role: 'user',
        authProvider: 'local',
      };

      this.users.push(user);
      localStorage.setItem('users', JSON.stringify(this.users));
      return true;
    },
    login(credentials: Pick<User, 'email' | 'password'>): boolean {
      const user = this.users.find(
        (u) =>
          u.email.toLowerCase() === credentials.email.toLowerCase() &&
          u.password === credentials.password,
      );

      if (!user) return false;

      this.setCurrentUser(user);
      return true;
    },
    setCurrentUser(user: User) {
      this.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
    },
    logout() {
      this.currentUser = null;
      localStorage.removeItem('currentUser');
    },
  },
});
