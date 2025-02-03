import chalk from "chalk";
import { APP_ENV, DEV_ENV } from "../config.js";

function getFileName(error) {
    const { stack } = error;
    const stackLines = stack.split('\n');
    let fileName = '';

    if (stackLines.length > 1) {
        const firstLine = stackLines[1];
        const match = firstLine.match(/\((.*?):\d+:\d+\)/);
        if (match && match[1]) {
            const fullPath = match[1];
            const loggIndex = fullPath.indexOf('/Logg/');
            if (loggIndex !== -1) {
                fileName = fullPath.substring(loggIndex + 1);
            } else {
                fileName = fullPath;
            }
        }
    }

    return fileName;
}

function formatMessage(level, msg) {
    const timestemp = new Date().toISOString()

    switch(level) {
        case 'info':
            return chalk.blue(`[${timestemp}], INFO: ${msg}\n`)

        case 'warning':
            return chalk.yellow(`[${timestemp}], WARNING: ${msg}\n`)

        case 'error':
            if (msg instanceof Error) {
                const fileName = getFileName(msg);

                if (APP_ENV === DEV_ENV) {
                    return chalk.red(`[${timestemp}], ERROR: ${ msg.name }: ${ msg.message }\n In file: ${ fileName }\n`)
                }
            }
            return chalk.red(`[${timestemp}], ERROR: ${ msg }\n`)

        default:
        return chalk.gray(`[${timestemp}], UNKNOW: ${msg}`)

    }

}

export default formatMessage
