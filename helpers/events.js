import { promises as fs } from "node:fs"
import { EventEmitter } from "node:events"

class LoggerEvent extends EventEmitter {}

export const loggerEvent = new LoggerEvent()
export const LOG = 'log'

loggerEvent.on(LOG, async (path, message) => {
    try {
        await fs.appendFile(path, message);
        console.log(message);
    } catch (err) {
        console.error("Error while trying to append data to file:", err.message);
    }
});

