import stripAnsi from 'strip-ansi';
import { Formatter } from '../types/formatter';
import { LogOptions } from '../types/loggerOptions';

export const stripAnsiFormat: Formatter = (logData: LogOptions): LogOptions => {
    const data = logData;
    data.message = stripAnsi(data.message);
    return data;
};