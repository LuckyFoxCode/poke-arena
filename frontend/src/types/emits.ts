export interface EmitPayloadMap {
  'set-tab': 'signup' | 'signin';
  'trigger-toast': {
    message: string;
    type: 'success' | 'error';
  };
}

export type EmitEvent = keyof EmitPayloadMap;
export type EmitFn = <K extends EmitEvent>(event: K, payload: EmitPayloadMap[K]) => void;
