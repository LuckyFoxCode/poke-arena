export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  createAt: string;
  role: 'user' | 'admin';
  authProvider: 'local' | 'twitch';
}
