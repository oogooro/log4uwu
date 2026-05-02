import { LogLevel } from './types/loggerOptions';

export const logLevelPriorities: Record<LogLevel, number> = {
    debug: 0,
    init: 1,
    info: 1,
    warn: 2,
    error: 3,
}