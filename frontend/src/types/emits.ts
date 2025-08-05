import type { User } from './user';

export type EmitEvent = 'add-user' | 'trigger-toast';

export interface EmitPayloadMap {
  'add-user': User;
  'trigger-toast': {
    message: string;
    type: 'success' | 'error';
  };
}

export type EmitFn = <K extends EmitEvent>(event: K, payload: EmitPayloadMap[K]) => void;
