import { Formatter } from '../types/formatter';
import { LogOptions } from '../types/loggerOptions';

export const jsonFormat: Formatter = (logData: LogOptions): LogOptions => {
    const data = logData;
    data.message = JSON.stringify(data);
    return data;
};