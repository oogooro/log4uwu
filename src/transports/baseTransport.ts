import { LogOptions } from '../types/loggerOptions';

export abstract class BaseTransport {
    public abstract logData(logData: LogOptions): void;
};