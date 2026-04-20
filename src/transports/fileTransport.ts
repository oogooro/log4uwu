import path from 'node:path';
import { LogOptions } from '../types/loggerOptions';
import { BaseTransport } from './baseTransport';
import fs from 'node:fs';
import { Writable } from 'node:stream';
import stripAnsi from 'strip-ansi';
import { FileTransportOptions } from '../types/fileTransport';
import { formatDate } from '../utils';

export class FileTransport extends BaseTransport {
    private writeStream: Writable;
    private queue: string[] = [];
    private writing: boolean = false;

    constructor(filePath: string, options?: FileTransportOptions) {
        super();

        const resolvedPath = path.resolve(filePath);
        const dir = path.dirname(resolvedPath);

        fs.mkdirSync(dir, { recursive: true });

        try {
            fs.rmSync(resolvedPath, { force: true, recursive: true });
        } catch (err) {
            throw err;
        }

        this.writeStream = fs.createWriteStream(resolvedPath, { flags: 'as', });
    }

    public override logData(options: LogOptions): void {
        const { level, message } = options;
        this.queue.push(`[${formatDate(new Date())}] - ${level.toUpperCase()} - ${stripAnsi(message)}\n`);
        this.flush();
    }

    private flush(): void {
        if (this.writing) return;
        this.writing = true;

        while (this.queue.length) {
            const chunk = this.queue.shift()!;
            const ok = this.writeStream.write(chunk);

            if (!ok) {
                this.writeStream.once('drain', () => {
                    this.writing = false;
                    this.flush();
                });
                return;
            }
        }

        this.writing = false;
    }
};