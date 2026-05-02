import { LoggerOptions, LogOptions } from './types/loggerOptions';
import { BaseTransport } from './transports/baseTransport';
import { LoggerThread } from './loggerThread';
import { BaseLogger } from './types/logger';
import figlet from 'figlet';

export class Logger implements BaseLogger {
    private transports: BaseTransport[];
    private threadCounter = 0;
    public verboseDebug: boolean;

    constructor(options: LoggerOptions) {
        this.transports = options.transports;
        this.verboseDebug = options.verboseDebug ?? false;

        if (options.bannerText) {
            console.log(figlet.textSync(options.bannerText));
        }

        if (options.formatters) {
            for (const transport of this.transports) {
                for (const formatter of options.formatters) {
                    transport.format(formatter);
                }
            }
        }
    }

    public log(logData: LogOptions): void {
        for (const transport of this.transports) {
            const logDataCopy = { ...logData };
            transport.logData(logDataCopy);
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