import { Logger } from './logger';
import { BaseLogger } from './types/logger';
import { LogOptions } from './types/loggerOptions';

export class LoggerThread implements BaseLogger {
    public readonly id: number;
    constructor (logger: Logger, threadId: number) {
        this.id = threadId;
    }

    public log(logData: LogOptions): void {

    }

    public debug(message: string): void {
        
    }

    public error(message: string | Error): void {

    }
};