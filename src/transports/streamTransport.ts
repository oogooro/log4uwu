import { Writable } from 'node:stream';
import { LogOptions } from '../types/loggerOptions';
import { BaseTransport } from './baseTransport';
import chalk from 'chalk';
import { formatDate, levelColors } from '../utils';

export class StreamTransport extends BaseTransport {
    private stream: Writable;
    
    constructor (stream: Writable) {
        super();
        this.stream = stream;
    }

    public logData(logData: LogOptions): void {
        const { color, message, level } = logData;
        this.stream.write(`[${formatDate(new Date())}] [${chalk[levelColors[level]](level.toUpperCase())}] ${chalk[color ?? 'white'](message)}\n`);
    }
};