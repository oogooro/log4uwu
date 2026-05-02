import chalk from 'chalk';
import { Formatter } from '../types/formatter';
import { LogOptions } from '../types/loggerOptions';
import { levelColors } from '../utils';

export const levelColorFormat: Formatter = (logData: LogOptions): LogOptions => {
    const data = logData;
    data.message = `[${chalk[levelColors[data.level]](data.level.toUpperCase())}] ${data.message}`;
    return data;
};