import { LoggerOptions, LogOptions } from './types/loggerOptions';
import { BaseTransport } from './transports/baseTransport';
import { LoggerThread } from './loggerThread';
import { BaseLogger } from './types/logger';

export class Logger implements BaseLogger {
    private transports: BaseTransport[];
    private threadCounter = 0;

    constructor(options: LoggerOptions) {
        this.transports = options.transports;
    }

    public log(logData: LogOptions): void {
        for (const transport of this.transports) {
            transport.logData(logData);
        }
    }

    public debug(message: string): void {
        this.log({
            level: 'debug',
            message: message,
        });
    }

    public error(message: string | Error): void {
        this.log({
            level: 'error',
            message: typeof message === 'string' ? message : message.stack || message.message,
            color: 'redBright',
        });
    }

    public startThread(): LoggerThread {
        const thread = new LoggerThread(this, this.threadCounter);
        this.threadCounter++;
        return thread;
    }
};