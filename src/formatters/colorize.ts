import { Formatter } from '../types/formatter';
import { LogOptions } from '../types/loggerOptions';
import chalk from 'chalk';

export const colorizeFormat: Formatter = (logData: LogOptions): LogOptions => {
    const data = logData;
    data.message = chalk[data.color ?? 'white'](data.message);
    return data;
};