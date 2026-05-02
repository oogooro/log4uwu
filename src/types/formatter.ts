import { LogOptions } from './loggerOptions';

export type Formatter = (logData: LogOptions) => LogOptions;