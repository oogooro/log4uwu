import { Formatter } from '../types/formatter';
import { LogOptions } from '../types/loggerOptions';

export abstract class BaseTransport {
    protected formatterPipeline: Formatter[] = [];
    public logLevel: number = 0;
    public abstract logData(logData: LogOptions): void;
    
    public format(formatter: Formatter): this {
        this.formatterPipeline.push(formatter);
        return this;
    };

    protected applyFormat(logData: LogOptions): LogOptions {
        for (const formatter of this.formatterPipeline) {
            logData = formatter(logData);
        }
        return logData;
    }

    public level(level: number): this {
        this.logLevel = level;
        return this;
    }
};