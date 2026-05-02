import { Formatter } from '../types/formatter';
import { LogOptions } from '../types/loggerOptions';

export const levelFormat: Formatter = (logData: LogOptions): LogOptions => {
    const data = logData;
    data.message = `[${data.level.toUpperCase()}] ${data.message}`;
    return data;
};