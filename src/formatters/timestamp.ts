import { Formatter } from '../types/formatter';
import { LogOptions } from '../types/loggerOptions';
import { formatDate } from '../utils';

export const timestampFormat: Formatter = (logData: LogOptions): LogOptions => {
    const data = logData;
    data.message = `[${formatDate(new Date())}] ${data.message}`;
    return data;
};