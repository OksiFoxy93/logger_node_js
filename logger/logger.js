import fs from "node:fs"
import path from "node:path"
import levels from "./levels.js"
import formatMessage from "./formatter.js"
import { APP_ENV, DEV_ENV, PROD_ENV, QA_ENV } from "../config.js";
import { LOG, loggerEvent } from "../helpers/events.js";

class Logger {

    constructor(logPath = 'logs/app.log') {
        this.logPath = logPath

        if (!fs.existsSync(path.dirname(this.logPath))) {
            fs.mkdirSync(path.dirname(this.logPath), { recursive: true })
        }
    }

    __log(level, msg) {
        const formattedMsg = formatMessage(level, msg);

        switch(APP_ENV) {
            case DEV_ENV:
                loggerEvent.emit(LOG, this.logPath, formattedMsg)
                break;

            case QA_ENV:
                if (level === levels.ERROR || level === levels.WARNING) {
                    loggerEvent.emit(LOG, this.logPath, `QA: ${formattedMsg}`)
                }
                break;

            case PROD_ENV:
                if (level === levels.ERROR) {
                    loggerEvent.emit(LOG, this.logPath, `PROD: ${formattedMsg}`)
                }
                break;

            default: return console.log(formattedMsg);
        }
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
