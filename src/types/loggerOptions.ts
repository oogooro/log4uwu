import { ColorName } from 'chalk';
import { BaseTransport } from '../transports/baseTransport';

export interface LoggerOptions {
    transports: BaseTransport[];
    bannerText?: string; 
};

export type LogLevel = 'init' | 'info' | 'warn' | 'error' | 'debug';

export interface LogOptions {
    level: LogLevel;
    message: string;
    color?: ColorName;
};