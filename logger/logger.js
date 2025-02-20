import fs from "node:fs"
import path from "node:path"
import levels from "./levels.js"
import { LOG, loggerEvent } from "../helpers/events.js";

class Logger {

    constructor(logPath = 'logs/app.log') {
        this.logPath = logPath

        if (!fs.existsSync(path.dirname(this.logPath))) {
            fs.mkdirSync(path.dirname(this.logPath), { recursive: true })
        }
    }

    __log(level, msg) {
        loggerEvent.emit(LOG, this.logPath, level, msg)
    }

    info(msg) {
        this.__log(levels.INFO, msg)
    }


    warning(msg) {
        this.__log(levels.WARNING, msg)
    }


    error(msg) {
        this.__log(levels.ERROR, msg)
    }
}

export default Logger
