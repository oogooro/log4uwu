import { ColorName } from 'chalk';
import { LogLevel } from './types/loggerOptions';

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
});

export const formatDate = (date: Date): string => {
    const parts = dateFormatter.formatToParts(date);
    const map: Record<string, string> = {};
    for (const p of parts) map[p.type] = p.value;

    return `${map.day}-${map.month}-${map.year} ${map.hour}:${map.minute}:${map.second}`;
};

export const levelColors: Record<LogLevel, ColorName> = {
    debug: 'cyanBright',
    error: 'redBright',
    info: 'greenBright',
    init: 'whiteBright',
    warn: 'yellowBright',
};