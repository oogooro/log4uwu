import { LogOptions } from './loggerOptions';

export interface BaseLogger {
    log: (logData: LogOptions) => void;
    debug: (message: string) => void;
    error: (message: string | Error) => void;
};