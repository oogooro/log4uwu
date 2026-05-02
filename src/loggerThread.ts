import { Logger } from './logger';
import { BaseLogger } from './types/logger';
import { LogOptions } from './types/loggerOptions';

export class LoggerThread implements BaseLogger {
    public readonly id: string;
    private readonly logger: Logger;
    constructor (logger: Logger, threadId: string) {
        this.id = threadId;
        this.logger = logger;
    }

    public log(logData: LogOptions): void {
        this.logger.log({ ...logData, threadId: this.id, });
    }
    
    public debug(message: string): void {
        this.logger.debug(message);
    }

    public error(message: string | Error): void {
        this.logger.error(message);
    }
};