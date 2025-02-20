import fs from "node:fs";
import { pipeline } from 'stream';
import { EventEmitter } from "node:events";
import { Transform } from "node:stream";
import formatMessage from "../logger/formatter.js";
import { APP_ENV } from "../config.js";

class LoggerEvent extends EventEmitter {}

export const loggerEvent = new LoggerEvent()
export const LOG = 'log'

loggerEvent.on(LOG, async (path, level, message) => {
    const transformStream = new Transform({
        objectMode: true,
        transform(chunk, enc, callback) {
            const { message, level } = chunk;
            const formattedMsg = formatMessage(level, message, APP_ENV);
            callback(null, formattedMsg);
        }
    });

    const writableStream = fs.createWriteStream(path, { flags: 'a' });

    try {
        await pipeline(
            transformStream,
            writableStream
        )
    } catch (err) {
        console.error(`Stream error: ${err.message}`);
    }

    transformStream.write({ level, message });
});
