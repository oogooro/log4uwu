import path from 'node:path';
import { LogOptions } from '../types/loggerOptions';
import { BaseTransport } from './baseTransport';
import fs from 'node:fs';
import { Writable } from 'node:stream';
import moment from 'moment';
import stripAnsi from 'strip-ansi';
import { FileTransportOptions } from '../types/fileTransport';

export class FileTransport extends BaseTransport {
    private writeStream: Writable;
    
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
        this.writeStream.write(`[${moment(new Date()).format('DD-MM-YY HH:mm:ss')}] - ${level.toUpperCase()} - ${stripAnsi(message)}\n`);
    }
};