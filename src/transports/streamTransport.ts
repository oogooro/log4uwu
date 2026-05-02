import { Writable } from 'node:stream';
import { LogOptions } from '../types/loggerOptions';
import { BaseTransport } from './baseTransport';

export class StreamTransport extends BaseTransport {
    private stream: Writable;
    
    constructor (stream: Writable) {
        super();
        this.stream = stream;
    }

    public logData(logData: LogOptions): void {
        const { message } = this.applyFormat(logData);
        this.stream.write(`${message}\n`);
    }
};