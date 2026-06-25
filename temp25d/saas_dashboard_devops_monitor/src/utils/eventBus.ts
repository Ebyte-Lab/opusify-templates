import { LogLevel } from '../types';

type WriteFn = (message: string, type: LogLevel) => void;
type TriggerFn = (presetIndex?: number) => void;

let writeFn: WriteFn | null = null;
let triggerFn: TriggerFn | null = null;

export const registerTerminalWrite = (fn: WriteFn) => {
  writeFn = fn;
};

export const registerAlertTrigger = (fn: TriggerFn) => {
  triggerFn = fn;
};

export const terminalWrite = (message: string, type: LogLevel) => {
  if (writeFn) {
    writeFn(message, type);
  } else {
    console.warn('Terminal write not registered:', message);
  }
};

export const alertTrigger = (presetIndex?: number) => {
  if (triggerFn) {
    triggerFn(presetIndex);
  } else {
    console.warn('Alert trigger not registered');
  }
};
