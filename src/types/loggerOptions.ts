import { ColorName } from 'chalk';
import { BaseTransport } from '../transports/baseTransport';
import { Formatter } from './formatter';

export interface LoggerOptions {
    transports: BaseTransport[];
    formatters?: Formatter[];
    bannerText?: string; 
};

export type LogLevel = 'init' | 'info' | 'warn' | 'error' | 'debug';

export interface LogOptions {
    level: LogLevel;
    message: string;
    color?: ColorName;
    threadId?: string;
};