import chalk from 'chalk';
import { Formatter } from '../types/formatter';
import { LogOptions } from '../types/loggerOptions';

export const threadFormat: Formatter = (logData: LogOptions): LogOptions => {
    const data = logData;
    if (data.threadId) {
        data.message = `${chalk.magenta(data.threadId)} ${data.message}`;
    }
    return data;
};