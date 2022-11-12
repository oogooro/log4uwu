import fs from 'node:fs';
import chalk from 'chalk';
import moment from 'moment';

export interface LoggerOptions {
    transports: string[];
    debugMode?: boolean;
}

export interface LogOptions {
    message: string,
    level: 
        | 'info'
        | 'init'
        | 'debug'
        | 'error'
        | 'warn'
        | 'thread';
    color?:
        | 'black'
        | 'red'
        | 'green'
        | 'yellow'
        | 'blue'
        | 'magenta'
        | 'cyan'
        | 'white'
        | 'gray'
        | 'grey'
        | 'blackBright'
        | 'redBright'
        | 'greenBright'
        | 'yellowBright'
        | 'blueBright'
        | 'magentaBright'
        | 'cyanBright'
        | 'whiteBright';
    silent?: boolean;
    thread?: LoggerThread;
}

export default class Logger {
    public transports: string[] = [];
    public threads: Map<string, LoggerThread> = new Map();
    public debugMode: boolean = false;

    constructor(options: LoggerOptions) {
        this.transports = options.transports;
        this.debugMode = options.debugMode;
        for (const transport of this.transports)
            if (fs.existsSync(transport)) {
                fs.rmSync(transport);
            }
    }

    log({ level, message, color, silent, thread, }: LogOptions): string {
        let prefix = '';
        if (level == 'info') prefix = `[${chalk.greenBright('INFO')}]`;
        else if (level == 'init') prefix = `[${chalk.whiteBright('INIT')}]`;
        else if (level == 'debug') prefix = `[${chalk.cyanBright('DEBUG')}]`;
        else if (level == 'error') prefix = `[${chalk.redBright('ERROR')}]`;
        else if (level == 'warn') prefix = `[${chalk.yellowBright('WARN')}]`;
        else if (level == 'thread') prefix = `[${chalk.magentaBright('THREAD')}]`;

        if (!silent) {
            if (chalk[color]) process.stdout.write(`${prefix} ${chalk[color](message)}\n`);
            else process.stdout.write(`${prefix} ${message}\n`);
        }
        
        const writeMessageString = `[${moment(new Date()).format('HH:mm:ss')}] - ${level.toUpperCase()} - ${message}\n`;

        for (const transport of this.transports) fs.writeFileSync(transport, writeMessageString, { flag: 'as', });

        return message;
    }

    debug(message: string): string {
        return this.log({
            level: 'debug',
            message,
            silent: !this.debugMode,
        });
    }

    error(err: Error): string {
        return this.log({
            level: 'error',
            message: err.stack || err.message,
            color: 'redBright',
        });
    }

    endAllThreads(): string[] {
        const endedThreads: string[] = [];
        this.threads.forEach(t => {
            t.end();
            endedThreads.push(t.id);
        });
        return endedThreads;
    }

    startThread(): LoggerThread {
        return new LoggerThread(this);
    }
}

let threadId = 1;

export class LoggerThread {
    public id: string;
    public logger: Logger;

    constructor(logger: Logger) {
        this.logger = logger;
        this.id = `0x${threadId.toString(16)}`;
        threadId++;
        logger.threads.set(this.id, this);

        this.logger.log({
            level: 'thread',
            message: `Started thread ID ${this.id}`,
            silent: !this.logger.debugMode,
            thread: this,
        });
    }

    log({ level, message, color, silent, }: LogOptions): string {
        let prefix = '';
        if (level == 'info')        prefix = `[${chalk.greenBright('INFO')}]`;
        else if (level == 'init')   prefix = `[${chalk.whiteBright('INIT')}]`;
        else if (level == 'debug')  prefix = `[${chalk.cyanBright('DEBUG')}]`;
        else if (level == 'error')  prefix = `[${chalk.redBright('ERROR')}]`;
        else if (level == 'warn')   prefix = `[${chalk.yellowBright('WARN')}]`;
        else if (level == 'thread') prefix = `[${chalk.magentaBright('THREAD')}]`;

        prefix += ` ${chalk.magentaBright(this.id)}`;

        if (!silent) {
            if (chalk[color]) process.stdout.write(`${prefix} ${chalk[color](message)}\n`);
            else process.stdout.write(`${prefix} ${message}\n`);
        }

        const writeMessageString = `[${moment(new Date()).format('HH:mm:ss')}] - ${level.toUpperCase()} - ${this.id} - ${message}\n`;

        for (const transport of this.logger.transports) fs.writeFileSync(transport, writeMessageString, { flag: 'as', });

        return message;
    }

    debug(message: string): string {
        return this.log({
            level: 'debug',
            message,
            silent: !this.logger.debugMode,
            thread: this,
        });
    }

    error(err: Error): string {
        return this.log({
            level: 'error',
            message: err.stack || err.message,
            color: 'redBright',
            thread: this,
        });
    }

    end(): void {
        this.logger.log({
            level: 'thread',
            message: `Ended thread ID ${this.id}`,
            silent: !this.logger.debugMode,
            thread: this,
        });
        this.logger.threads.delete(this.id);
    }
}
