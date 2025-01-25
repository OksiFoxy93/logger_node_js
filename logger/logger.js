import fs from "node:fs"
import path from "node:path"
import levels from "./levels.js"
import formatMessage from "./formatter.js"
import { APP_ENV } from "../config.js";

class Logger {

    constructor(logPath = 'logs/app.log') {
        this.logPath = logPath

        if (!fs.existsSync(path.dirname(this.logPath))) {
            fs.mkdirSync(path.dirname(this.logPath), { recursive: true })
        }
    }

    __log(level, details) {
        let formattedMsg;

        if (details instanceof Error) {
            formattedMsg = formatMessage(level, `${ details.stack }`);
        } else {
            formattedMsg = formatMessage(level, details);
        }

        switch(APP_ENV) {
            case 'dev': return console.log(formattedMsg);

            case 'qa':
                if (level === levels.ERROR || level === levels.WARNING) {
                    fs.appendFile(this.logPath, `QA: ${formattedMsg}\n`, (err) => {
                        if (err) {
                            console.error("Error while trying to append data to file:", err.message);
                        }
                    });
                }
                break;

            case 'prod':
                if (level === levels.ERROR) {
                    fs.appendFile(this.logPath, `PROD: ${formattedMsg}\n`, (err) => {
                        if (err) {
                            console.error("Error while trying to append data to file:", err.message);
                        }
                    });
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
