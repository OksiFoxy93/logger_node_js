import chalk from "chalk";
import { DEV_ENV, PROD_ENV } from "../config.js";
import levels from "./levels.js";

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

const formatMessage = (level, msg, env) => {
    const timestemp = new Date().toISOString();
    const levelText = level.toUpperCase();
    const baseMsg = `[${timestemp}], ${levelText}: ${msg}\n`;

    if (env === PROD_ENV && level !== levels.ERROR) {
        return;
    }

    let formattedMsg = baseMsg;
    if (env === DEV_ENV && level === levels.ERROR && msg instanceof Error) {
        const fileName = getFileName(msg);
        formattedMsg += `In file: ${fileName}\n`;
    }

    switch (level) {
        case levels.INFO:
            return chalk.blue(formattedMsg);
        case levels.WARNING:
            return chalk.yellow(formattedMsg);
        case levels.ERROR:
            return chalk.red(formattedMsg);
        default:
            return chalk.gray(formattedMsg);
    }
};

export default formatMessage
